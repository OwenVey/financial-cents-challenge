import axios from 'axios';
import { z } from 'zod';

const UsersResponseSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  data: z.array(
    z.object({
      id: z.number(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
  ),
});

/**
 * Fetches a list of clients from the API and enriches each client with additional random data
 *
 * @param {number} page - The page number to fetch clients from
 * @returns A promise that resolves to an object containing client data and metadata
 * @throws Will throw an error if the response data does not conform to the expected schema
 */
export async function fetchClients(page: number) {
  // await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000)); // random latency
  const response = await axios.get('https://reqres.in/api/users', { params: { page } });
  const { data, ...rest } = UsersResponseSchema.parse(response.data);
  return {
    ...rest,
    clients: data.map((client) => {
      return {
        ...client,
        lastInvoice: generateRandomDate(),
        amount: +(Math.random() * 200000).toFixed(2),
        invoiceStatus: Math.random() < 0.5 ? 'Paid' : 'Overdue',
      } as const;
    }),
  };
}

/**
 * Formats a given number as US currency (USD)
 *
 * @param {number} number - The number to format
 * @returns The formatted currency string
 */
export function formatAsUSCurrency(number: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}

/**
 * Generates a random date between January 1, 2023, and the current date.
 *
 * @returns A random date object
 */
export function generateRandomDate() {
  const startTime = new Date('2023-01-01').getTime();
  const endTime = new Date().getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}


/**
 * Generates a random string ID
 *
 * The ID is a randomly generated string consisting of alphanumeric characters.
 * Specifically, it is a substring of a base-36 encoded random number
 *
 * @returns A random string ID
 */
export function getId() {
  return Math.random().toString(36).substring(2, 8);
}
