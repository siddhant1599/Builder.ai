
(function () {
    const ERROR_STORE_KEY = "__PROJECT_COMPANION_ERRORS__";
    window[ERROR_STORE_KEY] = window[ERROR_STORE_KEY] || [];

    // Helper to send messages to parent
    const sendToParent = (type, payload) => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: "PreviewError",
                subType: type,
                payload: payload,
                timestamp: Date.now()
            }, "*");
        }
    };

    // 1. Global Error Handler (Runtime Errors)
    window.addEventListener('error', (event) => {
        const error = {
            message: event.message,
            source: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error ? event.error.stack : null,
            type: 'Runtime Error'
        };
        window[ERROR_STORE_KEY].push(error);
        sendToParent('RUNTIME_ERROR', error);
    });

    // 2. Unhandled Promise Rejections
    window.addEventListener('unhandledrejection', (event) => {
        const error = {
            message: event.reason ? (event.reason.message || event.reason.toString()) : 'Unhandled Promise Rejection',
            stack: event.reason ? event.reason.stack : null,
            type: 'Promise Rejection'
        };
        window[ERROR_STORE_KEY].push(error);
        sendToParent('PROMISE_REJECTION', error);
    });

    // 3. Console Error Interception
    const originalConsoleError = console.error;
    console.error = function (...args) {
        originalConsoleError.apply(console, args);
        // Convert args to string for safe transport
        const message = args.map(arg => {
            try {
                return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            } catch (e) {
                return String(arg);
            }
        }).join(' ');

        const error = {
            message: message,
            type: 'Console Error',
            stack: new Error().stack // Capture call stack
        };

        // Debounce console errors slightly to avoid flood
        if (!window._lastConsoleError || (Date.now() - window._lastConsoleError > 500)) {
            window._lastConsoleError = Date.now();
            sendToParent('CONSOLE_ERROR', error);
        }
    };

    // 4. Vite Error Overlay Detection (Compile Errors)
    // This is crucial for catching build errors that Vite displays in an overlay.
    function checkForViteErrorOverlay() {
        const overlay = document.querySelector('vite-error-overlay');
        if (!overlay) return;

        // Retry if shadow root isn't ready
        if (!overlay.shadowRoot) {
            requestAnimationFrame(checkForViteErrorOverlay);
            return;
        }

        try {
            const shadowRoot = overlay.shadowRoot;
            const messageBody = shadowRoot.querySelector('.message-body')?.textContent?.trim() || '';
            const fileText = shadowRoot.querySelector('.file')?.textContent?.trim() || '';
            const frame = shadowRoot.querySelector('.frame')?.textContent?.trim() || '';

            if (messageBody) {
                const fullMessage = `Build Error: ${messageBody}\nFile: ${fileText}\n${frame}`;
                sendToParent('COMPILE_ERROR', {
                    message: fullMessage,
                    type: 'Compile Error',
                    stack: frame
                });
            }
        } catch (e) {
            console.log("Failed to parse Vite overlay", e);
        }
    }

    // Watch for the overlay being added to the DOM
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                const hasErrorOverlay = Array.from(mutation.addedNodes).some(
                    node => node.nodeName?.toLowerCase() === 'vite-error-overlay'
                );
                if (hasErrorOverlay) {
                    // Give it a moment to render content
                    setTimeout(checkForViteErrorOverlay, 100);
                }
            }
        }
    });

    const startObserver = () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            // Wait for body if script runs in head
            window.addEventListener('DOMContentLoaded', () => {
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }
    };
    startObserver();

    // Initial check in case we loaded late
    if (document.querySelector('vite-error-overlay')) {
        checkForViteErrorOverlay();
    }

    console.log('[Project Companion] Error Listener Initialized');
})();
