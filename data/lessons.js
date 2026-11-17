/**
 * GraphNest content registry.
 * To add a note: add exactly one object following AGENTS.md; no HTML changes needed.
 * Diagram coordinates are percentages in a 0–100 SVG viewBox.
 */
export const lessons = [
  {
    id: 'graph-basics',
    title: 'Graph、Vertex 與 Edge',
    english: 'The language of graph theory',
    category: '基礎觀念',
    level: '入門',
    minutes: 4,
    summary: '從頂點與邊開始，認識 order、size、degree 與 Handshaking Lemma。',
    definition: 'Graph G = (V, E)，其中 V 是頂點集合（vertices），E 是連接頂點的邊集合（edges）。',
    explanation: [
      'Order 是頂點數 |V|；Size 是邊數 |E|。兩者回答的是不同問題，不能混用。',
      '無向圖中，頂點的 degree 表示連到該頂點的邊數；一條 loop 對 degree 貢獻 2。',
      'Handshaking Lemma：所有頂點度數加總等於 2|E|，所以奇數度頂點的個數一定是偶數。'
    ],
    formula: 'Σ deg(v) = 2|E|',
    example: '右圖有 5 個頂點、5 條邊。各點度數為 1、3、2、3、1，總和 10 = 2 × 5。',
    takeaway: '考試先數 |V|、|E|，再用 degree-sum 檢查答案。',
    tags: ['Graph', 'Degree', 'Handshaking'],
    diagram: {
      nodes: [{id:'A',x:18,y:25},{id:'B',x:48,y:14},{id:'C',x:78,y:32},{id:'D',x:67,y:78},{id:'E',x:25,y:75}],
      edges: [['A','B'],['B','C'],['C','D'],['D','E'],['B','D']]
    },
    quiz: {
      question: '一個無向圖有 7 條邊，所有頂點的度數總和是多少？',
      options: ['7', '14', '21'],
      answer: 1,
      explanation: '每一條邊在度數總和中被計算兩次，所以是 2 × 7 = 14。'
    }
  },
  {
    id: 'euler-trail',
    title: 'Eulerian Trail 與 Circuit',
    english: 'Use every edge exactly once',
    category: '路徑與迴路',
    level: '核心',
    minutes: 5,
    summary: '只看奇數度頂點數量，就能快速判定是否存在 Euler trail 或 circuit。',
    definition: 'Eulerian Trail 是恰好走過每條邊一次的 trail；Eulerian Circuit 則是起點與終點相同的 Eulerian Trail。',
    explanation: [
      '對所有非零度頂點位於同一連通分量的無向圖：0 個奇數度頂點，存在 Eulerian Circuit。',
      '恰好 2 個奇數度頂點，存在 Eulerian Trail，但不存在 Eulerian Circuit；這兩個奇數度頂點是起終點。',
      '若奇數度頂點超過 2 個，就不存在 Eulerian Trail。判斷前記得檢查連通條件。'
    ],
    formula: 'odd degree count = 0 → circuit；= 2 → trail',
    example: '右圖是四邊形再多接一條尾巴：有兩個奇數度頂點，因此有 Eulerian Trail，沒有 Eulerian Circuit。',
    takeaway: 'Eulerian 關注的是「每條 edge」，不是每個 vertex 恰好走一次。',
    tags: ['Eulerian', 'Trail', 'Circuit'],
    diagram: {
      nodes: [{id:'A',x:22,y:23},{id:'B',x:66,y:23},{id:'C',x:66,y:76},{id:'D',x:22,y:76},{id:'E',x:91,y:23}],
      edges: [['A','B'],['B','C'],['C','D'],['D','A'],['B','E']]
    },
    quiz: {
      question: '連通無向圖有且只有 2 個奇數度頂點時，可以確定什麼？',
      options: ['存在 Eulerian Circuit', '存在 Eulerian Trail，但沒有 Circuit', '兩者皆不存在'],
      answer: 1,
      explanation: '恰好兩個奇數度頂點表示可以從其中一個出發，到另一個結束，但不能形成封閉的 Eulerian Circuit。'
    }
  },
  {
    id: 'bipartite',
    title: 'Bipartite Graph 雙分圖',
    english: 'Two groups, no odd cycles',
    category: '圖的結構',
    level: '核心',
    minutes: 5,
    summary: '把頂點分成兩群，理解「無奇環」為什麼是雙分圖的充要條件。',
    definition: 'Bipartite graph 的頂點可以分割成兩個互斥集合 U、W，且所有邊的兩端分別位於 U 與 W。',
    explanation: [
      '雙分圖內任何一次移動都會在 U、W 之間切換，因此封閉的 cycle 長度必定是偶數。',
      '反過來說，若一張無向圖沒有 odd cycle，就能在每個連通分量選一個起點，依與起點距離的奇偶將頂點分成兩群。',
      '因此 Graph is bipartite ⇔ Graph has no odd cycle。這也是常見的二著色（2-coloring）判定法。'
    ],
    formula: 'Bipartite ⇔ no odd cycle',
    example: '右圖是 K₃,₃：左側三點與右側三點相連，同側頂點之間沒有邊，因此是雙分圖。',
    takeaway: '找到一個奇環就能否定 bipartite；找不到還需要有系統地證明。',
    tags: ['Bipartite', 'Odd Cycle', '2-Coloring'],
    diagram: {
      nodes: [{id:'U1',x:23,y:17,group:0},{id:'U2',x:23,y:50,group:0},{id:'U3',x:23,y:83,group:0},{id:'W1',x:77,y:17,group:1},{id:'W2',x:77,y:50,group:1},{id:'W3',x:77,y:83,group:1}],
      edges: [['U1','W1'],['U1','W2'],['U1','W3'],['U2','W1'],['U2','W2'],['U2','W3'],['U3','W1'],['U3','W2'],['U3','W3']]
    },
    quiz: {
      question: '一張圖中含有 5-cycle，以下哪個敘述一定正確？',
      options: ['它不是 bipartite graph', '它一定是 tree', '它必定存在 Eulerian circuit'],
      answer: 0,
      explanation: '5-cycle 是奇環；有任何奇環的圖都不可能是雙分圖。'
    }
  },
  {
    id: 'trees',
    title: 'Tree 與 Spanning Tree',
    english: 'Connected without cycles',
    category: '樹與生成樹',
    level: '核心',
    minutes: 6,
    summary: '學會判定 tree、理解 n−1 條邊，以及 spanning tree 為什麼不能留環。',
    definition: 'Tree 是連通且沒有 cycle 的無向圖；Spanning Tree 則是包含原圖所有頂點的樹狀子圖。',
    explanation: [
      '一棵有 n 個頂點的 tree 一定恰好有 n−1 條邊，任兩點之間也恰好只有一條 simple path。',
      'Tree 中每一條邊都是 bridge：移除後會使圖不連通。反之，在 tree 中加入一條原本不存在的邊，會產生唯一的一個 cycle。',
      '連通圖的 spanning tree 保留全部頂點，刪除部分邊直到沒有 cycle；其邊數固定為 n−1。'
    ],
    formula: '|E(Tree)| = |V(Tree)| − 1',
    example: '右圖有 6 個頂點與 5 條邊，且每個頂點都連通、沒有 cycle，所以是一棵 tree。',
    takeaway: '判定 spanning tree 的三個關鍵：全頂點、連通、沒有 cycle。',
    tags: ['Tree', 'Bridge', 'Spanning Tree'],
    diagram: {
      nodes: [{id:'A',x:50,y:13},{id:'B',x:22,y:38},{id:'C',x:78,y:38},{id:'D',x:10,y:77},{id:'E',x:39,y:78},{id:'F',x:78,y:78}],
      edges: [['A','B'],['A','C'],['B','D'],['B','E'],['C','F']]
    },
    quiz: {
      question: '一棵 tree 有 12 個頂點，應有幾條邊？',
      options: ['10', '11', '12'],
      answer: 1,
      explanation: 'Tree 的邊數一定是 n−1，因此 12−1 = 11。'
    }
  },
  {
    id: 'degree-sequence',
    title: 'Degree Sequence 度數序列',
    english: 'Can these degrees form a graph?',
    category: '基礎觀念',
    level: '進階',
    minutes: 6,
    summary: '用 Handshaking Lemma 與 Havel–Hakimi 檢查一組度數能否構成 simple graph。',
    definition: 'Degree sequence 是把所有頂點度數列成序列；若存在 simple graph 實現它，稱為 graphic sequence。',
    explanation: [
      '第一關：度數總和必須是偶數，且 n 個頂點構成的 simple graph 中，每個 degree 必須介於 0 到 n−1。',
      'Havel–Hakimi：將序列由大到小排序、刪去最大度數 d，再將後面 d 個數各減 1，重複檢查。',
      '若過程中出現負數、d 超出剩餘項數，則不是 graphic；若最後全為 0，便是 graphic。只有「度數和為偶數」還不夠。'
    ],
    formula: 'Simple graph: 0 ≤ deg(v) ≤ n−1',
    example: '序列 (2,2,2,2) 可由右圖的 C₄ 實現：每個頂點的 degree 都是 2。',
    takeaway: '先做快速必要條件檢查，再用 Havel–Hakimi 判定。',
    tags: ['Degree Sequence', 'Havel–Hakimi', 'Graphic'],
    diagram: {
      nodes: [{id:'A',x:25,y:25},{id:'B',x:75,y:25},{id:'C',x:75,y:75},{id:'D',x:25,y:75}],
      edges: [['A','B'],['B','C'],['C','D'],['D','A']]
    },
    quiz: {
      question: '度數序列 (3,3,1,1) 是否可能是 simple graph 的度數序列？',
      options: ['可以', '不可以', '資訊不足'],
      answer: 1,
      explanation: '兩個 degree=3 的頂點都必須連到其他三點，會使兩個 degree=1 的頂點至少各有 degree 2；因此不可能。'
    }
  },
  {
    id: 'paths-cycles',
    title: 'Walk、Trail、Path、Cycle',
    english: 'Four easily confused definitions',
    category: '路徑與迴路',
    level: '入門',
    minutes: 4,
    summary: '一次分清楚 walk、trail、path 與 cycle，避免定義題失分。',
    definition: 'Walk 可以重複走點與邊；Trail 不重複邊；Path 不重複頂點；Cycle 是除了首尾同點外沒有重複頂點的封閉 path。',
    explanation: [
      'Walk 是最寬鬆的概念：只要每一步有相鄰的邊即可。',
      'Trail 的每條邊至多走一次，但可以重訪某個頂點；Path 則要求所有頂點都互不重複。',
      'Circuit 是 closed trail；Cycle 是除了起點=終點之外不重複頂點的 closed path（通常至少有三條邊，針對 simple graph）。'
    ],
    formula: 'Path ⊂ Trail ⊂ Walk',
    example: '右圖的 A→B→C→D→A 是一個 4-cycle；同時也是 circuit 和 closed walk。',
    takeaway: '考試問定義時，先確認限制的是 edge 還是 vertex。',
    tags: ['Walk', 'Trail', 'Path', 'Cycle'],
    diagram: {
      nodes: [{id:'A',x:50,y:12},{id:'B',x:84,y:50},{id:'C',x:50,y:88},{id:'D',x:16,y:50}],
      edges: [['A','B'],['B','C'],['C','D'],['D','A']]
    },
    quiz: {
      question: 'Trail 和 Path 最主要的差別是什麼？',
      options: ['Trail 不可重複 vertex', 'Path 不可重複 vertex', 'Path 可以重複 edge'],
      answer: 1,
      explanation: 'Trail 限制 edge 不重複；Path 對 vertex 的限制更嚴格。'
    }
  }
];

export const categories = ['全部筆記', '基礎觀念', '路徑與迴路', '圖的結構', '樹與生成樹'];
