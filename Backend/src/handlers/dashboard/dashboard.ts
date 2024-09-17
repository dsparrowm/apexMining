import { Response, Request } from 'express';
import prisma from '../../db';

const dashboard = async (req: Request, res: Response) => {
    const { userId } = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                deposits: true,
                withdrawals: true,
                investments: true,
                balances: true
        }
    });

    // Format balances for easy display
    const formattedBalances = user.balances.reduce((acc, balance) => {
        acc[balance.cryptoType] = balance.amount;
        return acc;
      }, {});

      const dashboardData = {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        balances: formattedBalances,
        investments: user.investments,
        deposits: user.deposits,
        withdrawals: user.withdrawals,
      };
      res.status(200)
      return res.json(dashboardData);

    } catch (error) {
        console.error('Dashboard fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
}

export default dashboard;