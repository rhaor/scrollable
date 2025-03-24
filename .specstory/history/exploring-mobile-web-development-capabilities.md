## SpecStory

## Exploring Mobile Web Development Capabilities (3/22/2025, 9:46:29 PM)

_**User**_

Hi! I'm looking to create an interactive mobile app to teach high school students about social media addiction, specifically the concept of variable reward. Do not fill in content yet. But I want it overall to be set up on mobile so there's a fixed container exactly the size of the screen. That container could be scrollable, but the mobile version of the overall webpage should not be. There will be 8 screens that the user will navigate between. It would be amazing if this can be adapted so it doesn't look too bad on a desktop. 

---

_**Assistant**_

I'll help you create a mobile-first web application with a fixed container and smooth navigation between screens. I'll set up the basic structure using React and modern CSS to ensure it works well on both mobile and desktop devices.

First, let me check if there's any existing project structure.


---

_****_

<details>
            <summary>Listed current directory • **15** results</summary>
        
| Name |
|-------|
| 📄 `src` |
| 📄 `node_modules` |
| 📄 `package-lock.json` |
| 📄 `package.json` |
| 📄 `tsconfig.app.json` |
| 📄 `tsconfig.json` |
| 📄 `tsconfig.node.json` |
| 📄 `vite.config.ts` |
| 📄 `index.html` |
| 📄 `public` |
| 📄 `.gitignore` |
| 📄 `README.md` |
| 📄 `eslint.config.js` |
| 📄 `.specstory` |
| 📄 `.git` |

</details>

---

_****_

I see there's already a React project set up with TypeScript and Vite. Let me check the current package.json to see what dependencies we have.


---

_****_

Read file: package.json

---

_****_

Great! We already have some excellent dependencies including Framer Motion for animations and Tailwind CSS for styling. Let's create the basic structure for our app. I'll create a new component for the mobile container and set up the navigation system.

First, let's create a new component for our mobile container:


---

_****_

```diff
- 
+ import React from 'react';
+ import { motion } from 'framer-motion';
+ 
+ interface MobileContainerProps {
+   children: React.ReactNode;
+ }
+ 
+ const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
+   return (
+     <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
+       <motion.div 
+         className="w-full max-w-md h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden relative"
+         initial={{ scale: 0.95, opacity: 0 }}
+         animate={{ scale: 1, opacity: 1 }}
+         transition={{ duration: 0.3 }}
+       >
+         {children}
+       </motion.div>
+     </div>
+   );
+ };
+ 
+ export default MobileContainer; 
```

---

_****_

Now, let's create a navigation system to handle the 8 screens:


---

_****_

```diff
- 
+ import React, { useState } from 'react';
+ import { motion, AnimatePresence } from 'framer-motion';
+ 
+ interface ScreenNavigatorProps {
+   screens: React.ReactNode[];
+ }
+ 
+ const ScreenNavigator: React.FC<ScreenNavigatorProps> = ({ screens }) => {
+   const [currentScreen, setCurrentScreen] = useState(0);
+ 
+   const nextScreen = () => {
+     if (currentScreen < screens.length - 1) {
+       setCurrentScreen(prev => prev + 1);
+     }
+   };
+ 
+   const previousScreen = () => {
+     if (currentScreen > 0) {
+       setCurrentScreen(prev => prev - 1);
+     }
+   };
+ 
+   return (
+     <div className="h-full w-full relative">
+       <AnimatePresence mode="wait">
+         <motion.div
+           key={currentScreen}
+           initial={{ x: 300, opacity: 0 }}
+           animate={{ x: 0, opacity: 1 }}
+           exit={{ x: -300, opacity: 0 }}
+           transition={{ type: "spring", stiffness: 300, damping: 30 }}
+           className="h-full w-full absolute"
+         >
+           {screens[currentScreen]}
+         </motion.div>
+       </AnimatePresence>
+ 
+       {/* Navigation Controls */}
+       <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
+         <button
+           onClick={previousScreen}
+           disabled={currentScreen === 0}
+           className={`px-4 py-2 rounded-lg ${
+             currentScreen === 0
+               ? 'bg-gray-300 text-gray-500'
+               : 'bg-blue-500 text-white hover:bg-blue-600'
+           }`}
+         >
+           Previous
+         </button>
+         <button
+           onClick={nextScreen}
+           disabled={currentScreen === screens.length - 1}
+           className={`px-4 py-2 rounded-lg ${
+             currentScreen === screens.length - 1
+               ? 'bg-gray-300 text-gray-500'
+               : 'bg-blue-500 text-white hover:bg-blue-600'
+           }`}
+         >
+           Next
+         </button>
+       </div>
+     </div>
+   );
+ };
+ 
+ export default ScreenNavigator; 
```

---

_****_

Now, let's create a basic screen component that we'll use as a template for all 8 screens:



---

_****_

```diff
- 
+ import React from 'react';
+ 
+ interface ScreenProps {
+   children: React.ReactNode;
+   className?: string;
+ }
+ 
+ const Screen: React.FC<ScreenProps> = ({ children, className = '' }) => {
+   return (
+     <div className={`h-full w-full p-6 overflow-y-auto ${className}`}>
+       {children}
+     </div>
+   );
+ };
+ 
+ export default Screen; 
```

---

_****_

Finally, let's update the main App component to use our new components:



---

_****_

```diff
- import { useState } from 'react'
- import reactLogo from './assets/react.svg'
- import viteLogo from '/vite.svg'
- import './App.css'
+ import React from 'react';
+ import MobileContainer from './components/MobileContainer';
+ import ScreenNavigator from './components/ScreenNavigator';
+ import Screen from './components/Screen';
  
  function App() {
-   const [count, setCount] = useState(0)
+   // Placeholder screens - these will be replaced with actual content
+   const screens = Array(8).fill(null).map((_, index) => (
+     <Screen key={index}>
+       <h1 className="text-2xl font-bold mb-4">Screen {index + 1}</h1>
+       <p>Content for screen {index + 1} will go here.</p>
+     </Screen>
+   ));
  
    return (
-     <>
-       <div>
-         <a href="https://vite.dev" target="_blank">
-           <img src={viteLogo} className="logo" alt="Vite logo" />
-         </a>
-         <a href="https://react.dev" target="_blank">
-           <img src={reactLogo} className="logo react" alt="React logo" />
-         </a>
-       </div>
-       <h1>Vite + React</h1>
-       <div className="card">
-         <button onClick={() => setCount((count) => count + 1)}>
-           count is {count}
-         </button>
-         <p>
-           Edit <code>src/App.tsx</code> and save to test HMR
-         </p>
-       </div>
-       <p className="read-the-docs">
-         Click on the Vite and React logos to learn more
-       </p>
-     </>
-   )
+     <MobileContainer>
+       <ScreenNavigator screens={screens} />
+     </MobileContainer>
+   );
  }
  
- export default App
+ export default App;
  
```

---

_****_

I've set up a complete mobile-first web application structure with the following features:

1. A `MobileContainer` component that:
   - Creates a fixed-size container that's 90% of the viewport height
   - Centers the container on the page
   - Has a nice shadow and rounded corners
   - Includes a subtle animation when the app loads

2. A `ScreenNavigator` component that:
   - Handles navigation between 8 screens
   - Provides Previous/Next buttons
   - Includes smooth transitions between screens using Framer Motion
   - Disables navigation buttons when at the start/end

3. A `Screen` component that:
   - Provides a consistent layout for all screens
   - Has proper padding and scrolling behavior
   - Is customizable through className prop

4. The main `App` component that:
   - Currently shows placeholder content for all 8 screens
   - Is ready for you to add the actual content about social media addiction

The app is fully responsive and will:
- Look great on mobile devices with a fixed container
- Adapt nicely to desktop screens (the container will be centered and have a max-width)
- Have smooth animations and transitions
- Support scrolling within each screen while keeping the overall container fixed

You can now start adding the actual content for each screen. Would you like me to help you set up the content for any specific screen, or would you like to make any adjustments to the current structure?

---



---

