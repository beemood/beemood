export interface Runable {
  run(): void | Promise<void>;
}
