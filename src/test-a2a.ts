/**
 * External Test Client for A2A Server
 * 
 * This script simulates another agent or client sending a message
 * to your agent's A2A endpoint.
 * 
 * Usage:
 * 1. Ensure your A2A server is running (npm run start:a2a)
 * 2. Run this test: npx tsx src/test-a2a.ts
 */

async function testA2A() {
  const url = 'http://localhost:3000/a2a';
  
  const payload = {
    jsonrpc: '2.0',
    method: 'message/send',
    params: {
      message: {
        role: 'user',
        parts: [
          {
            type: 'text',
            text: 'Tell me a short joke about artificial intelligence.'
          }
        ]
      },
      configuration: {
        streaming: false
      }
    },
    id: 1
  };

  console.log('🚀 Sending request to A2A server...');
  console.log(`📡 URL: ${url}`);
  console.log(`📝 Message: "${payload.params.message.parts[0].text}"`);
  console.log('---');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: any = await response.json();

    if (data.error) {
      console.error('❌ Server returned an error:', data.error);
    } else {
      console.log('✅ Response received:');
      const agentResponse = data.result.messages.find((m: any) => m.role === 'agent');
      const responseText = agentResponse?.parts[0]?.text || 'No text in response';
      console.log('\n🤖 Agent says:');
      console.log(responseText);
      console.log('\n---');
      console.log('Task ID:', data.result.id);
    }
  } catch (error: any) {
    console.error('❌ Failed to connect to server:', error.message);
    console.log('\n💡 Make sure your server is running with `npm run start:a2a`');
  }
}

testA2A();
