import NavigationLink from "./NavigationLink";

const links = [
    { link: 'https://mage.studio/docs/', label: 'DOCS' },
    { link: 'https://github.com/MageStudio/Mage', label: 'GITHUB' },
]

const Header = () => (
    <header>
        <div class='logo-container'>
            <img src='/img/logo.png' height={40} width={40}/>
        </div>
        <nav>
            <ul class="navigation-links">
                { links.map(linkDetails => (
                    <li><NavigationLink {...linkDetails}/></li>
                ))}
            </ul>
        </nav>
    </header>
)

export default Header;