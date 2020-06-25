const { Kafka } = require('kafkajs');
// var jsonDataTest = require('./ebProcess-ebDataFieldSignatureMapItem_upsertsOnly.json');
var jsonDataTest = require('./test_data/8.json');

// console.log(jsonDataTest);
const kafka = new Kafka({
  clientId: 'example-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
// console.log(JSON.stringify(jsonDataTest));
const emitMessage = async () => {
    const fileData = JSON.stringify(jsonDataTest);
    await producer.connect();
    await producer.send({
      topic: 'AUDIT',
      messages: [
        {
            value: fileData,
            headers: {
                'event.name': jsonDataTest.eventName
            }
        },
      ],
    });
    await producer.disconnect()
}

emitMessage().catch(e => console.error(`[example/producer] ${e.message}`, e))

