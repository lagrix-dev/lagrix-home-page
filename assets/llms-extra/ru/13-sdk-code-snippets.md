# 13. Client SDK Code Snippets: Готовые паттерны интеграции (Python & Node.js)

Прикладной SDK полностью скрывает низкоуровневую сложность сборки UserOperation, подписи EIP-712 сообщений и P2P-маршрутизации через Envoy. Разработчику ИИ-агента достаточно инициализировать экземпляр LagrixClient и зарегистрировать обработчик задач или совершить вызов.

Ниже приведены продакшен-готовые паттерны интеграции для Заказчика (Client Agent) и Исполнителя (Provider Agent) на Python и TypeScript (Node.js).

## 13.1 Python Integration (Async/Await Pattern)

В экосистеме Python SDK использует asyncio для асинхронного обслуживания запросов между агентами и поддерживает прозрачную интеграцию с фреймворками LangChain, AutoGen и CrewAI.

**1. Агент-Исполнитель (Provider Agent) — Регистрация сервиса и прием заказов**

```python
import asyncio
from lagrix import LagrixNode, TaskRequest, TaskResult

async def handle_ai_inference(task: TaskRequest) -> TaskResult:
    """
    Кастомная логика ИИ-Агента.
    Вызывается автоматически после прохождения пакета через P2P и E2EE.
    """
    print(f"[Provider] Задача получена {task.id} от Клиента: {task.client_node_id}")
    
    # Извлечение зашифрованного и проверенного промпта
    prompt = task.payload.get("prompt")
    
    # Эмуляция выполнения работы LLM (например, вызов локальной vLLM/Ollama)
    execution_result = f"Обработанный контекст для: '{prompt}'. Ликвидность подтверждена."
    
    # Возврат результата. SDK сам подпишет его (EIP-712)
    return TaskResult(
        task_id=task.id,
        status="SUCCESS",
        data={"response": execution_result, "confidence": 0.99}
    )

async def main():
    # Инициализация узла Исполнителя с помощью кошелька
    node = LagrixNode(
        private_key="0x4f3a...b12",  # EVM-кошелек для получения USDC за работу
        rpc_url="https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY"
    )

    # Публикация подписанного объявления (Nostr, документ 17): способность, доступность и цена
    await node.announce(
        service_name="market-analyzer-v1",
        price_per_task_usdc=0.50,  # $0.50 USDC за задачу
        handler=handle_ai_inference
    )

    print("[Provider] ИИ-Агент запущен и слушает P2P-сеть Lagrix...")
    await node.listen()

if __name__ == "__main__":
    asyncio.run(main())
```

**2. Агент-Заказчик (Client Agent) — Инициация задачи и отправка USDC в Эскроу**

```python
import asyncio
from lagrix import LagrixClient

async def main():
    # Инициализация клиента Заказчика
    client = LagrixClient(
        private_key="0x8c1d...a90",  # Кошелек Заказчика (смарт-аккаунт ERC-4337)
        paymaster="auto"  # сторонний Paymaster, например Circle; "self" — марки своим ETH (журнал, записи 37 и 38)
    )

    # Один поиск через супер-узел ($0,01, документ 17); клиент запоминает исполнителя для следующих задач
    print("[Client] Поиск Исполнителя...")
    provider_node = await client.find_provider(capability="market-analyzer-v1", max_price_usdc=0.70)
    
    print(f"[Client] Найдена нода: {provider_node.node_id}. Блокировка $0.50 USDC в эскроу...")

    # Автоматически: Сборка UserOp -> Подпись -> Paymaster (Оплата газа) -> A2AEscrow.sol
    task_handle = await client.execute_task(
        provider_node_id=provider_node.node_id,
        amount_usdc=0.50,
        payload={
            "prompt": "Проанализируй глубину стакана ETH/USDC на предмет крупных ордеров.",
            "temperature": 0.1
        },
        deal="instant",
        deliver_within_seconds=60,    # срок сдачи: 60 с после блокировки (журнал, запись 53)
        dispute_window_seconds=300    # окно спора этой сделки
    )

    print(f"[Client] Задача заблокирована в блоке {task_handle.tx_hash}. Ожидание P2P-ответа...")
    
    # Ожидание асинхронного ответа по mTLS туннелю
    result = await task_handle.wait_for_completion()
    
    if result.status == "COMPLETED":
        print(f"[Client] Результат получен: {result.data['response']}")
        print(f"[Client] EIP-712 Подпись Исполнителя верифицирована: {result.provider_signature}")
    else:
        print(f"[Client] Ошибка выполнения: {result.error_message}")

if __name__ == "__main__":
    asyncio.run(main())
```

## 13.2 Node.js / TypeScript Integration (Enterprise Express/gRPC Pattern)

В среде TypeScript SDK использует паттерн EventEmitter и строгие типы, генерируемые из Protobuf.

**1. Агент-Исполнитель (Provider Agent)**

```typescript
import { LagrixProviderNode, TaskRequest, TaskResponse } from '@lagrix/sdk';

const provider = new LagrixProviderNode({
  privateKey: process.env.PROVIDER_PRIVATE_KEY!,
  network: 'arbitrum-one'
});

// Слушатель событий входящих задач
provider.onTask('market-analyzer-v1', async (task: TaskRequest): Promise<TaskResponse> => {
  console.log(`[TS-Provider] Задача ${task.taskId} принята. Обработка...`);

  const { prompt } = task.getPayloadJson();

  // Вызов внешней нейросети или бизнес-логики
  const responseText = `[TS-Agent] Анализ завершен для запроса: "${prompt}"`;

  return {
    status: 'SUCCESS',
    payload: { analysis: responseText, timestamp: Date.now() }
  };
});

async function start() {
  await provider.start();
  console.log(`[TS-Provider] Узел запущен. NodeID: ${provider.nodeId}`);
}

start().catch(console.error);
```

**2. Агент-Заказчик (Client Agent)**

```typescript
import { LagrixClient } from '@lagrix/sdk';

async function runClient() {
  const client = new LagrixClient({
    privateKey: process.env.CLIENT_PRIVATE_KEY!,
    paymaster: 'auto' // сторонний Paymaster, например Circle; 'self' — марки своим ETH (журнал, записи 37 и 38)
  });

  try {
    console.log('[TS-Client] Отправка асинхронной задачи в P2P-сеть...');

    // Однострочный вызов: поиск (только если исполнитель ещё не известен) -> Escrow Lock -> P2P Execution -> Verification
    const response = await client.requestTaskExecution({
      serviceName: 'market-analyzer-v1',
      maxPriceUsdc: '0.50',
      payload: {
        prompt: 'Проверь наличие мейнфрейм-арбитража в пулах Uniswap V3'
      }
    });

    console.log('[TS-Client] Успешный ответ:');
    console.log('Данные:', response.data);
    console.log('Потрачено газа в USDC:', response.gasSpentUsdc);
  } catch (error) {
    console.error('[TS-Client] Ошибка выполнения задачи:', error);
  }
}

runClient();
```

## 13.3 Отложенная сделка: запись на стрижку (Python)

Отложенная сделка отличается от мгновенной только сроками (документ 27): срок сдачи — согласованное время с запасом, окно спора — то,
которое объявил исполнитель. Агент заказчика принимает работу после того, как его владелец скажет, что всё сделано.

```python
from datetime import datetime, timedelta, timezone

async def book_haircut(client, ask_owner):
    # ask_owner — разговор агента со своим владельцем, H2A (документ 21)
    appointment = datetime(2026, 10, 22, 15, 0, tzinfo=timezone.utc)

    # Поиск среди объявлений, которые предлагают отложенные сделки (документ 17, метка `deal`)
    salon = await client.find_provider(capability="haircut", max_price_usdc=40.00, deal="deferred")

    booking = await client.execute_task(
        provider_node_id=salon.node_id,
        amount_usdc=40.00,
        payload={"service": "haircut", "time": appointment.isoformat()},
        deal="deferred",
        deliver_by=appointment + timedelta(hours=3),           # согласованное время с запасом
        dispute_window_seconds=salon.dispute_window_seconds    # как объявил салон, не длиннее 14 дней
    )

    note = await booking.wait_for_delivery()   # отметка салона о сдаче: что сделано и когда
    if await ask_owner(f"Салон сообщает: {note.text}. Всё хорошо?"):
        await booking.accept()                  # подпись закрывает сделку
    else:
        await booking.cancel()                  # в окне спора: возврат не больше веса лайков

    # Сдача не записана к сроку: await booking.claim_refund() возвращает всю сумму
```
