import { Product } from '../types';
import CategoryPage from './CategoryPage';

type Props = { products: Product[] };

const JewelryPage = ({ products }: Props) => (
  <CategoryPage
    products={products}
    title="Floral Jewelry"
    subtitle="Necklaces, rings, bracelets & earrings with real preserved flowers"
    category="Jewelry"
  />
);

export default JewelryPage;
