import loadingSvg from '../../../assets/loader.gif';

export const Loader: React.FC = () => {
  return (
    <div>
      <img src={loadingSvg} alt="Preloader" />
    </div>
  )
}