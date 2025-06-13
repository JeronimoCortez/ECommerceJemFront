import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import ShoppingCartButton from "../ShoppingCartButton/ShoppingCartButton";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
          <Logo />
        <div className="flex items-center space-x-4">
          <Search />
          <ShoppingCartButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
