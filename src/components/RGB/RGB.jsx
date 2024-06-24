import './RGB.css';

/**
 * @param {string} color
 * @param {string} [className]
 * @param rest
 * @return {JSX.Element}
 */
export function RGB({ color, className, ...rest }) {
  return (
    <span {...rest} className={['rgb', className].filter(Boolean).join(' ')}>
      <i className="rgb__icon" style={{ backgroundColor: color }} />
      {color}
    </span>
  );
}
