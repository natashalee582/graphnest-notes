import { lessons, categories } from '../data/lessons.js';

const errors = [];
const ids = new Set();
const validLevels = new Set(['入門', '核心', '進階']);
const fail = (location, message) => errors.push(`${location}: ${message}`);
const text = (v) => typeof v === 'string' && v.trim().length > 0;

if (!Array.isArray(lessons) || lessons.length === 0) fail('lessons', 'must contain at least one lesson');
if (!Array.isArray(categories) || categories[0] !== '全部筆記' || new Set(categories).size !== categories.length) fail('categories','invalid or duplicate categories');

for (const [i, lesson] of lessons.entries()) {
  const loc = `lessons[${i}]`;
  if (!text(lesson.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id)) fail(loc,'id must be lowercase kebab-case');
  if (ids.has(lesson.id)) fail(loc,'duplicate id');
  ids.add(lesson.id);
  for (const key of ['title','english','summary','definition','formula','example','takeaway']) {
    if (!text(lesson[key])) fail(loc,`missing ${key}`);
  }
  if (!categories.includes(lesson.category) || lesson.category === '全部筆記') fail(loc,'invalid category');
  if (!validLevels.has(lesson.level)) fail(loc,'invalid level');
  if (!Number.isInteger(lesson.minutes) || lesson.minutes < 1 || lesson.minutes > 30) fail(loc,'minutes must be 1..30');
  if (!Array.isArray(lesson.explanation) || lesson.explanation.length < 2 || lesson.explanation.length > 4 || !lesson.explanation.every(text)) fail(loc,'explanation must contain 2..4 paragraphs');
  if (!Array.isArray(lesson.tags) || lesson.tags.length < 2 || lesson.tags.length > 5 || !lesson.tags.every(text)) fail(loc,'tags must contain 2..5 strings');
  const diagram = lesson.diagram || {};
  if (!Array.isArray(diagram.nodes) || diagram.nodes.length < 2) fail(loc,'diagram needs at least 2 nodes');
  const nodeIds = new Set();
  for (const node of diagram.nodes || []) {
    if (!text(node.id) || nodeIds.has(node.id)) fail(loc,'node ids must be unique strings');
    nodeIds.add(node.id);
    for (const coord of ['x','y']) if (!Number.isFinite(node[coord]) || node[coord] < 0 || node[coord] > 100) fail(loc,`node ${node.id}: invalid ${coord}`);
    if (node.group !== undefined && ![0,1].includes(node.group)) fail(loc,'node group must be 0 or 1');
  }
  if (!Array.isArray(diagram.edges)) fail(loc,'diagram.edges must be an array');
  const seenEdges = new Set();
  for (const edge of diagram.edges || []) {
    if (!Array.isArray(edge) || edge.length !== 2 || !edge.every(id => nodeIds.has(id))) { fail(loc,'edge must connect two existing nodes'); continue; }
    if (edge[0] === edge[1]) fail(loc,'self-loop is not supported by diagram renderer');
    const key = [...edge].sort().join('|');
    if (seenEdges.has(key)) fail(loc,'duplicate undirected edge');
    seenEdges.add(key);
  }
  const quiz = lesson.quiz || {};
  if (!text(quiz.question) || !text(quiz.explanation)) fail(loc,'quiz question/explanation required');
  if (!Array.isArray(quiz.options) || quiz.options.length < 2 || quiz.options.length > 4 || !quiz.options.every(text)) fail(loc,'quiz.options must have 2..4 items');
  if (!Number.isInteger(quiz.answer) || quiz.answer < 0 || quiz.answer >= (quiz.options?.length ?? 0)) fail(loc,'quiz.answer index invalid');
}
if (errors.length) {
  console.error(`✖ ${errors.length} validation problem(s):\n` + errors.map(e=>`  - ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ GraphNest validation passed — ${lessons.length} notes, ${categories.length-1} categories, ${lessons.length} quizzes.`);
}
