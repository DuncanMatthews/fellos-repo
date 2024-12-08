import { SearchParams } from 'nuqs';
import ProfileViewPage from './_components/profile-view-page';

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page() {
  return <ProfileViewPage />;
}
