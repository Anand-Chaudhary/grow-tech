import prisma from '../../db/prisma';

export const listAdmins = async () => {
  const users = await prisma.adminUser.findMany();
  return users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    lastLoginAt: u.lastLoginAt,
  }));
};

export const updateAdmin = async (adminId: string, updates: { name?: string; role?: 'OWNER' | 'EDITOR'; isActive?: boolean }) => {
  if (updates.role) {
    const owners = await prisma.adminUser.count({ where: { role: 'OWNER', isActive: true } });
    const target = await prisma.adminUser.findUnique({ where: { id: adminId } });
    if (target?.role === 'OWNER' && updates.role !== 'OWNER' && owners <= 1) {
      const err: any = new Error('At least one active OWNER must remain');
      err.status = 409;
      throw err;
    }
  }
  const user = await prisma.adminUser.update({
    where: { id: adminId },
    data: updates,
  });
  return user;
};
