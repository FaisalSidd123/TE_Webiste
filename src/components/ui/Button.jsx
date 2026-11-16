import MagneticButton from '../motion/MagneticButton';
import './Button.css';

/**
 * Reusable Button component matching the architectural luxury theme.
 * Variants: 'gold' (default filled gold), 'outline', 'text'
 */
export default function Button({
  children,
  variant = 'gold',
  magnetic = true,
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...rest
}) {
  if (magnetic && (variant === 'gold' || variant === 'outline')) {
    return (
      <MagneticButton
        href={href}
        onClick={onClick}
        variant={variant}
        className={`btn btn--${variant} ${className}`}
        disabled={disabled}
        {...rest}
      >
        {children}
      </MagneticButton>
    );
  }

  const classes = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
