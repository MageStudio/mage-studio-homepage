const NavigationLink = ({ link, label, target = '_blank' }) => (
    <a
        href={link}
        target={target}>
            {label}
    </a>
);

export default NavigationLink;