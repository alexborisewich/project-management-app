---
to: <%= absPath %>/<%= component_name %>.types.ts
---
export type <%= component_name %>Props = {
  dataTestId?: string;
};

export type <%= component_name %>State = Record<string, never>;
