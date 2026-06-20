# DarwixAI - Intelligent Chat Assistant

## Project Overview

DarwixAI is a highly scalable, modern, responsive, and aesthetically pleasing chat assistant application built to provide a seamless conversational experience. The project serves as a dynamic user interface for a conversational AI, solving the problem of creating an intuitive and visually engaging platform for user-bot interactions. 

### 🚀 High Performance & Scalability (Virtualization)
A key highlight of this project is its ability to handle massive chat histories and large databases seamlessly. The application leverages **virtualization** via `react-virtuoso` to render only the messages currently visible in the viewport. This means whether there are ten messages or tens of thousands of messages, the DOM remains lightweight, ensuring lightning-fast performance, minimal memory usage, and zero lag during scrolling.

Written in a professional and beginner-friendly tone, this project demonstrates best practices in building React applications with beautiful user interfaces, smooth animations, local data persistence, and robust component architecture.

## Features

- **Massive Scalability (Virtualization):** Designed to handle large databases of messages without performance degradation. Uses `react-virtuoso` to virtualize the DOM, guaranteeing smooth scrolling and instant rendering regardless of chat history size.
- **Dynamic Chat Interface:** A visually stunning chat environment with glassmorphism effects, gradient backgrounds, and smooth scroll behavior.
- **Message Actions:** Users can interact with messages through a custom dropdown menu that allows copying text to the clipboard, replying to specific messages, viewing detailed message info (sent/delivered/read timestamps), and deleting messages.
- **Reply Functionality:** Supports threaded conversations by allowing users to reply to specific messages, displaying a visual "Replying to" banner above the input and within the chat history.
- **Typing Indicators:** Real-time animated typing indicators with bouncing dots that simulate the bot's response generation delay.
- **Emoji Picker Integration:** A built-in dark-themed emoji picker allows users to easily add emojis to their messages.
- **Local Storage Persistence:** Chat history is automatically saved to the browser's `localStorage`, ensuring that messages persist across page reloads and sessions.
- **Message Status Tracking:** Tracks and displays message delivery statuses, including "sent" and "failed", with the ability to retry failed bot responses.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewports, ensuring a consistent experience across all devices.
- **Custom Scrollbars:** Aesthetically customized scrollbars matching the overall application theme.
- **Auto-Resizing Input:** The message input textarea automatically expands and collapses based on the content being typed, up to a maximum height.

## Tech Stack

This project leverages modern web technologies and libraries:

- **React (v19.2.6):** The core library used for building the user interface and managing component state.
- **Vite:** A fast build tool and development server that provides rapid hot module replacement (HMR).
- **Tailwind CSS (v4.3.1):** A utility-first CSS framework used for rapid, responsive, and beautiful styling, including complex gradients and backdrop blurs.
- **JavaScript:** The primary programming language used for application logic.
- **Libraries and Dependencies:**
  - `react-icons`: Provides comprehensive icon packs (FontAwesome, Bootstrap icons) used throughout the UI.
  - `react-virtuoso`: Handles efficient rendering of the chat list, enabling smooth scrolling and performance optimization for large lists of messages.
  - `emoji-picker-react`: A comprehensive, customizable emoji picker component.
  - `react-markdown` & `remark-gfm`: (Included in dependencies for future markdown rendering capabilities).

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatArea.jsx     # Handles the display and virtualization of the message list
│   ├── Header.jsx       # Application header with status indicators
│   ├── Message.jsx      # Individual message bubble component with action menus
│   ├── MessageInput.jsx # Input area for typing messages, handling emojis, and replies
│   └── TypingIndicator.jsx # Animated typing dots component
├── assets/              # Static assets like images and icons
├── App.jsx              # Main application layout and state management container
├── index.css            # Global CSS, including Tailwind imports and custom scrollbar styles
└── main.jsx             # React entry point, wrapping App in StrictMode
```

### Explanation of Folders and Files

- **`src/components/`:** Contains all the modular, reusable React components that make up the user interface. Separating components keeps the code organized and maintainable.
- **`src/assets/`:** Reserved for static files such as images, SVGs, or custom fonts used in the project.
- **`src/App.jsx`:** The root component that holds the global state (messages, typing status) and orchestrates the layout by assembling the Header, ChatArea, and MessageInput components.
- **`src/main.jsx`:** The bootstrap file that mounts the React application to the DOM's root element.
- **`src/index.css`:** Contains global styles. Notably, it imports Tailwind CSS and defines custom CSS for the Webkit scrollbars to match the app's aesthetic.

## Components Documentation

### `App` (`src/App.jsx`)
- **Purpose:** The root container component that manages the core application state and layout.
- **Props received:** None.
- **State used:** 
  - `messages`: Array of message objects, initialized from `localStorage`.
  - `typing`: Boolean indicating if the bot is currently typing.
  - `replyTo`: Object storing the message currently being replied to (or null).
- **Functions inside:**
  - `sendMessage(text)`: Handles user input, creates a new user message, clears the reply state, simulates a bot typing delay, and then generates a simulated bot response (with an intentional failure rate for demonstration).
  - `retryMessage(id)`: Allows users to retry a bot message that previously failed to generate.
  - `deleteMessage(id)`: Removes a specific message from the state array.
- **Interaction:** Passes state and functions down as props to `Header`, `ChatArea`, and `MessageInput`.

### `ChatArea` (`src/components/ChatArea.jsx`)
- **Purpose:** Renders the scrollable list of messages efficiently.
- **Props received:** `messages`, `typing`, `retryMessage`, `deleteMessage`, `onReply`.
- **State used:** `useRef` for the Virtuoso list instance. `useMemo` to combine `messages` and the `typing` indicator into a single renderable list.
- **Functions inside:** Uses `useEffect` to automatically scroll to the bottom of the list whenever new data is added.
- **Interaction:** Uses the `Virtuoso` component for virtualized rendering. Maps over the data to render either a `Message` component or a `TypingIndicator`.
- **UI Behavior:** Ensures smooth scrolling and prevents performance degradation when the chat history grows large.

### `Header` (`src/components/Header.jsx`)
- **Purpose:** Displays the application title and the bot's current status.
- **Props received:** None.
- **State used:** None.
- **Interaction:** Pure presentational component rendered at the top of `App`.
- **UI Behavior:** Features a pulsating green "Online" indicator and a glassmorphism container design.

### `Message` (`src/components/Message.jsx`)
- **Purpose:** Represents an individual chat bubble for either the user or the bot.
- **Props received:** `message` (object), `retryMessage`, `deleteMessage`, `onReply`.
- **State used:** 
  - `copied`: Boolean for the copy feedback state.
  - `showMenu`: Boolean controlling the visibility of the action dropdown menu.
  - `showInfo`: Boolean controlling the visibility of the message info modal.
  - `menuPosition`: Object storing top/left coordinates for the dropdown menu.
- **Functions inside:**
  - `handleCopy()`: Uses the Clipboard API to copy the message text.
  - `handleMenuToggle()`: Calculates the absolute positioning for the dropdown menu relative to the button clicked, preventing off-screen rendering.
  - `useEffect`: Listens for outside clicks to close the dropdown menu.
- **Interaction:** Renders user messages on the right and bot messages on the left. Displays a reply preview if the message is a reply. Employs `createPortal` to render dropdowns and modals at the document body level to avoid z-index clipping issues.

### `MessageInput` (`src/components/MessageInput.jsx`)
- **Purpose:** The text input area where users compose and send messages.
- **Props received:** `sendMessage`, `replyTo`, `setReplyTo`.
- **State used:**
  - `text`: String containing the current input value.
  - `showEmojiPicker`: Boolean controlling the visibility of the emoji picker.
- **Functions inside:**
  - `handleSend()`: Validates input, calls `sendMessage`, and resets the textarea.
  - `handleKeyDown(e)`: Allows sending the message by pressing the `Enter` key (without shift).
  - `handleEmojiClick(emojiData)`: Appends the selected emoji to the current text.
  - `useEffect`: Manages the auto-resizing of the textarea based on its `scrollHeight` and closes the emoji picker on outside clicks.
- **Interaction:** Displays a "Replying to" banner if `replyTo` is populated. Connects to `EmojiPicker` for emoji integration.

### `TypingIndicator` (`src/components/TypingIndicator.jsx`)
- **Purpose:** Displays an animated visual cue that the bot is processing a response.
- **Props received:** None.
- **State used:** None.
- **UI Behavior:** Renders three bouncing dots with staggered animation delays, styled consistently with bot message bubbles.

## Functions Documentation

### `sendMessage(text)` (in `App.jsx`)
- **Purpose:** Core logic for dispatching user messages and handling bot replies.
- **Parameters:** `text` (String) - The content of the user's message.
- **Return values:** None.
- **Side effects:** Updates `messages` state with the user's message, resets `replyTo`, toggles `typing` state, sets a timeout, and eventually updates `messages` again with the bot's response.
- **Where it is used:** Passed down to and called by `MessageInput.jsx` when the user clicks send or presses Enter.

### `handleMenuToggle()` (in `Message.jsx`)
- **Purpose:** Calculates the exact coordinates to render the message action menu so it stays within the viewport.
- **Parameters:** None.
- **Return values:** None.
- **Side effects:** Updates the `menuPosition` and toggles `showMenu` state.
- **Where it is used:** Attached to the `onClick` event of the three-dots button on each message bubble.

### `handleEmojiClick(emojiData)` (in `MessageInput.jsx`)
- **Purpose:** Appends a selected emoji to the current message input.
- **Parameters:** `emojiData` (Object) - The data payload provided by the `emoji-picker-react` library.
- **Return values:** None.
- **Side effects:** Updates the `text` state by concatenating the emoji.
- **Where it is used:** Passed as the `onEmojiClick` prop to the `EmojiPicker` component.

## State Management

The application utilizes React's built-in hooks for state management, keeping dependencies lightweight:

- **`useState`:** Used extensively across components.
  - In `App.jsx`: Manages global `messages`, `typing` status, and the `replyTo` target.
  - In `Message.jsx`: Manages local UI states like `showMenu`, `showInfo`, and copy status.
  - In `MessageInput.jsx`: Manages the controlled input `text` and emoji picker visibility.
- **`useEffect`:** 
  - Used in `App.jsx` to synchronize the `messages` state with browser `localStorage`.
  - Used in `ChatArea.jsx` to trigger auto-scrolling when new messages arrive.
  - Used in `Message.jsx` and `MessageInput.jsx` to set up and tear down event listeners for "click outside" behavior to close menus/pickers.
  - Used in `MessageInput.jsx` to dynamically adjust the height of the textarea.
- **`useRef`:**
  - Used in `ChatArea.jsx` to hold a reference to the `Virtuoso` instance for programmatic scrolling.
  - Used in `Message.jsx` to reference the menu button and dropdown container for click-outside detection and coordinate calculation.
  - Used in `MessageInput.jsx` to reference the textarea element for auto-resizing and focus management.
- **`useMemo`:** Used in `ChatArea.jsx` to efficiently combine the `messages` array and the `typing` indicator object into a single array for rendering, avoiding unnecessary recalculations.

## UI and User Experience

- **Responsive Design:** Utilizes Tailwind's responsive prefixes (like `md:px-12`) to adjust padding, margins, and layouts depending on screen size. The chat container is constrained (`max-w-6xl`) on large screens but fills the viewport on mobile.
- **Animations:** Employs CSS animations for a dynamic feel. This includes the pulsating "Online" dot in the header, the bouncing typing indicator dots, and smooth transition scaling on buttons (e.g., hover effects on the send button).
- **Theme Support:** Features a rich, dark theme out of the box using deep slate and indigo gradients. Glassmorphism is heavily utilized via backdrop blurs (`backdrop-blur-3xl`, `bg-white/10`) to create a premium, modern aesthetic.
- **Loading States:** The visual typing indicator serves as a loading state, informing the user that the system is processing their input.
- **Error Handling:** Simulates real-world scenarios where bot responses might fail (using `Math.random()`). Failed messages display an error status and provide a clear, actionable "Retry" button.
- **Empty States:** Handled gracefully. If `localStorage` is empty, the chat area remains clean and awaits the first interaction.
- **Mobile Optimization:** Elements like action menus use specific positioning logic (`Math.max(PADDING, left)`) to ensure they never render off-screen on narrow mobile devices.

## Installation

Follow these steps to run the project locally:

### Clone repository
```bash
git clone <repository-url>
```

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build production version
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```
