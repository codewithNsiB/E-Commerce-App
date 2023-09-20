import { FiGitlab } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="mt-5 ">
      <div className="w-80 border-0 border-top border-dark mx-3">
        <div className="d-flex justify-content-between mx-4">
          <p className="fs-6 mt-3">© 2023 ShopNBuy™. All Rights Reserved.</p>
          <FiGitlab
            className="mt-3"
            size="20px"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
