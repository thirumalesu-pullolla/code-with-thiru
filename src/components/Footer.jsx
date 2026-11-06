
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {currentYear} Code With Thiru.
        Built for developers.
      </p>
    </footer>
  );
}

export default Footer;
