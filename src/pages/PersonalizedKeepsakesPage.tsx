import { Product } from '../types';
import CategoryPage from './CategoryPage';

type Props = { products: Product[] };

const PersonalizedKeepsakesPage = ({ products }: Props) => (
  <CategoryPage
    products={products}
    title="Personalized Keepsakes"
    subtitle="Custom-preserved memories from your most cherished flowers"
    category="Personalized Keepsakes"
  />
);

export default PersonalizedKeepsakesPage;
