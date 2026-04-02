import { Product } from '../types';
import CategoryPage from './CategoryPage';

type Props = { products: Product[] };

const CoastersSuncatchersPage = ({ products }: Props) => (
  <CategoryPage
    products={products}
    title="Coasters & Suncatchers"
    subtitle="Functional art pieces that bring nature's beauty into your home"
    category="Coasters & Suncatchers"
  />
);

export default CoastersSuncatchersPage;
