
function Footer() {
  const currentYear = new Date().getFullYear();

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
