import { test, expect } from '@playwright/test';

// Simple API test using Playwright's `request` fixture
// This test sends a GET request to a public API (JSONPlaceholder)
// and validates the response status code and JSON payload.

test('GET /todos/1 returns expected JSON', async ({ request }) => {
  // 1. Arrange: define the public API endpoint
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  // 2. Act: send a GET request using Playwright's request object
  // The request fixture is a lightweight HTTP client suitable for API tests
  const response = await request.get(url);

  // 3. Assert: validate HTTP status code (should be 200 OK)
  expect(response.status()).toBe(200);

  // 4. Assert: validate response headers contain JSON content-type
  const contentType = response.headers()['content-type'] || '';
  expect(contentType).toContain('application/json');

  // 5. Parse the JSON body and validate its shape and values
  const body = await response.json();

  // Validate a few expected properties from the sample TODO item
  // - id should be 1
  // - title should be a string
  // - completed should be a boolean
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('title');
  expect(typeof body.title).toBe('string');
  expect(body).toHaveProperty('completed');
  expect(typeof body.completed).toBe('boolean');

  // Helpful console output for beginners running the test locally
  console.log('API response body:', body);
});
