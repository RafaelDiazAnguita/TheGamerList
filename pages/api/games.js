import { select } from "../../lib/db";

export default async function handler(req, res) {
  const { page, title, from, to } = req.query;

  const min = 12 * parseInt(page);
  const pageSize = 12;

  const fields = ["*"];
  const tables = ["game"];
  const where = [];
  const order = ["id"];
  const limit = [`${min},${pageSize}`];

  if (title && title != "") where.push(`title LIKE '%${title}%'`);

  if (
    typeof to == typeof "" &&
    to?.length == 10 &&
    typeof from == typeof "" &&
    from?.length == 10
  )
    where.push(`release_date between '${from}' and '${to}'`);

  try {
    const games = await select(fields, tables, where, order, limit);
    const count = await select(["count(id) as count"], tables, where, [], []);

    res.status(200).json({
      games: games,
      count: count[0].count,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      games: null,
      count: null,
      error: true,
    });
  }
}
