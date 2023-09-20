// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: import('lucia').AuthRequest;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

// See:
// https://lucia-auth.com/getting-started/sveltekit/
/// <reference types="lucia" />
declare global {
  namespace Lucia {
    type Auth = import('$lib/server/auth').Auth;
    // type UserAttributes = {};
    // type SessionAttributes = {};
  }
}

// THIS IS IMPORTANT!!!
export {};
