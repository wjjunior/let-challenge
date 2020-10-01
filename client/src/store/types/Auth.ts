import { User } from "./User";

export interface Auth {
  id: string;
  name: string;
  email: string;
}
export interface State {
  user: {} | User;
  isAuthenticated: boolean;
  errors: Record<string, any>;
}
