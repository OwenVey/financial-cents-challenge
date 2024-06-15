import type { fetchClients } from '@/utils';

export type Client = Awaited<ReturnType<typeof fetchClients>>['clients'][number];
