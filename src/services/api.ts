
/**
 * Mock API Service
 * 
 * This module simulates a REST API using localStorage.
 * To connect a real API, replace these functions with actual fetch/axios calls.
 * The interface remains the same — all CRUD operations return Promises.
 */

import type { User } from "@/types/user";

const STORAGE_KEY = "crud_app_users";
const SIMULATED_DELAY = 400;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = (): string =>
  `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

const getStoredUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const api = {
  async getUsers(): Promise<User[]> {
    await delay(SIMULATED_DELAY);
    return getStoredUsers();
  },

  async getUserById(id: string): Promise<User | undefined> {
    await delay(SIMULATED_DELAY);
    const users = getStoredUsers();
    return users.find((u) => u.id === id);
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    await delay(SIMULATED_DELAY);
    const users = getStoredUsers();
    const newUser: User = { id: generateId(), ...userData };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    await delay(SIMULATED_DELAY);
    const users = getStoredUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    users[index] = { ...users[index], ...userData, id };
    saveUsers(users);
    return users[index];
  },

  async deleteUser(id: string): Promise<void> {
    await delay(SIMULATED_DELAY);
    const users = getStoredUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) throw new Error("User not found");
    saveUsers(filtered);
  },
};
