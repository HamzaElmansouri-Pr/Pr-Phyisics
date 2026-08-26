import { getLevels } from '@/lib/repositories/levels.repo';
import LevelForm from './LevelForm';

export const metadata = {
  title: 'Admin - Niveaux',
};

export default async function LevelsAdminPage() {
  const levels = await getLevels();

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestion des Niveaux</h1>
      <LevelForm levels={levels} />
    </div>
  );
}
