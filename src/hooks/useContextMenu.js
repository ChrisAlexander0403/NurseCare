import { useEffect, useCallback, useState } from "react";

const useContextMenu = (options) => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();
            setAnchorPoint({ x: e.pageX, y: e.pageY });
            setShow(true);
        },
        [setShow, setAnchorPoint]
    );

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);
    
    options.forEach(option => {
      console.log(option)
      option.addEventListener('contextmenu', handleContextMenu);
    });

    useEffect(() => {
      document.addEventListener('click', handleClick);
      // document.addEventListener('contextmenu', handleContextMenu);
    
      return () => {
        document.removeEventListener('click', handleClick);
        // document.removeEventListener('contextmenu', handleContextMenu);
      }
    }, []);

    return { anchorPoint, show };
    
}

export default useContextMenu;