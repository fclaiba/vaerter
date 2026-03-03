const USERS_KEY = "vaerter-auth-users-v1";
const SESSION_KEY = "vaerter-auth-session-v1";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  loggedAt: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  session?: AuthSession;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function randomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function seedUsers(): AuthUser[] {
  const now = new Date().toISOString();
  return [
    {
      id: "user-admin-seed",
      name: "Admin VAERTER",
      email: "admin@vaerter.com",
      password: "admin123",
      createdAt: now,
    },
  ];
}

function readUsers(): AuthUser[] {
  if (!isBrowser()) return seedUsers();
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) {
    const seeded = seedUsers();
    writeUsers(seeded);
    return seeded;
  }
  try {
    return JSON.parse(raw) as AuthUser[];
  } catch {
    const seeded = seedUsers();
    writeUsers(seeded);
    return seeded;
  }
}

function writeUsers(users: AuthUser[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function writeSession(session: AuthSession | null): void {
  if (!isBrowser()) return;
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function registerAccount(input: RegisterInput): AuthResult {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (name.length < 2) return { ok: false, error: "El nombre debe tener al menos 2 caracteres." };
  if (!email.includes("@")) return { ok: false, error: "Email invalido." };
  if (password.length < 6) return { ok: false, error: "La contrasena debe tener al menos 6 caracteres." };

  const users = readUsers();
  if (users.some((user) => user.email === email)) {
    return { ok: false, error: "Ya existe una cuenta con ese email." };
  }

  const now = new Date().toISOString();
  const newUser: AuthUser = {
    id: randomId("user"),
    name,
    email,
    password,
    createdAt: now,
  };
  writeUsers([newUser, ...users]);

  const session: AuthSession = {
    userId: newUser.id,
    name: newUser.name,
    email: newUser.email,
    loggedAt: now,
  };
  writeSession(session);
  return { ok: true, session };
}

export function loginAccount(email: string, password: string): AuthResult {
  const normalized = email.trim().toLowerCase();
  const users = readUsers();
  const user = users.find((item) => item.email === normalized);
  if (!user || user.password !== password) {
    return { ok: false, error: "Credenciales invalidas." };
  }

  const session: AuthSession = {
    userId: user.id,
    name: user.name,
    email: user.email,
    loggedAt: new Date().toISOString(),
  };
  writeSession(session);
  return { ok: true, session };
}

export function logoutAccount(): void {
  writeSession(null);
}
