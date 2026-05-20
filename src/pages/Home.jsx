import { useState } from "react";
import useDeleteAccount from "../hooks/useDeleteAccount";
import Modal from "../components/modal";

const Home = () => {
  const [email, setEmail, password, setPassword, error, signIn, deleteAccount] =
    useDeleteAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check user
    const exists = await signIn();

    if (exists) {
      setIsOpen(true);
    }
  };

  return (
    <div>
      <h1>Слово на сьогодні</h1>
      <h3>Word For Today</h3>
      <p>: wordfortodaycontact@gmail.com</p>

      <form className="delete" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Видалити акаунт</button>
      </form>

      <span>{error}</span>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClick={async () => {
          const ok = await deleteAccount();
          setIsOpen(false);
          if (ok) {
            setIsDeleted(true);
          }
        }}
      >
        <div>
          <p style={{ fontWeight: 700, fontSize: 24 }}>
            Видалити обліковий запис?
          </p>
          <p style={{ fontWeight: 700, fontSize: 24 }}>Delete your account?</p>
        </div>

        <p className="body">
          Цю дію неможливо скасувати. Усі ваші дані будуть втрачені назавжди.
          (This action cannot be undone. All your data will be permanently
          lost.)
        </p>
      </Modal>

      <Modal
        className={"green"}
        isOpen={isDeleted}
        setIsOpen={setIsDeleted}
        showButtons={false}
      >
        <div>
          <p style={{ fontWeight: 700, fontSize: 24 }}>
            Ваш акаунт успішно видалено.
          </p>
          <p style={{ fontWeight: 700, fontSize: 24 }}>
            Your account has been deleted successfully.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
