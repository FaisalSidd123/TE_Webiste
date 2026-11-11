import Icon from './Icon';
import './TextLink.css';

/** Text link with a gold hairline underline that re-draws on hover, and a nudging arrow. */
export default function TextLink({ href, children, arrow = true, className = '', ...rest }) {
  return (
    <a href={href} className={`tlink ${className}`} {...rest}>
      <span className="tlink__label">{children}</span>
      {arrow && <Icon name="arrowRight" size={18} className="tlink__arrow" />}
    </a>
  );
}
