'use client';

import * as React from 'react';

let serverHandoffComplete = false;
let id = 0;
function genId() {
  return ++id;
}

export function useStableId(): string {
  const reactId = React.useId();
  const [id, setId] = React.useState(
    serverHandoffComplete ? String(genId()) : `radix-id-initial-${reactId}`
  );

  React.useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
      setId(String(genId()));
    }
  }, []);
  return id;
}
