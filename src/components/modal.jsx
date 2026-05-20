const Modal = ({
  className,
  isOpen,
  setIsOpen,
  handleClick,
  showButtons = true,
  children,
}) => {
  return (
    <>
      {isOpen ? (
        <div className={`modal ${className}`}>
          <div className="text">{children}</div>
          <div className="buttons">
            <button onClick={() => setIsOpen(false)}>Закрити (Close)</button>
            {showButtons && (
              <button onClick={handleClick}>Видалити (Delete)</button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
