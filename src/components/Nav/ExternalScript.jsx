import { useEffect } from 'react';

function ExternalScript({ src, module }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = src;
        
        if (module) {
            script.type = 'module';
        } else {
            script.setAttribute('nomodule', '');
        }

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src, module]);

    return null;
};

export { ExternalScript }
