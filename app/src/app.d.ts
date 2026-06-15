/// <reference types="@cloudflare/workers-types" />

declare global {
  namespace App {
    interface Locals {}
    interface PageData {}
    interface PageState {}
    interface Platform {
      env: {
        DB: D1Database;
      };
    }
  }
}

export {};
