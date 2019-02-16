import React, { useState } from 'react';
import { App, Window, Button, Text, render, Box } from '../src/';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <App>
      <Window>
        <Box>
          <Text>{`You clicked ${count} times`}</Text>
          <Button onClick={() => setCount(count + 1)}>Click Me</Button>
        </Box>
      </Window>
    </App>
  );
}

render(<Example />);
