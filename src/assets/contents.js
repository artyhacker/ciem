const contents = [
  {
    key: "上海市",
    title: "上海市",
    children: [
      {
        key: "上海市-长宁区",
        title: "长宁区",
        children: [
          {
            key: "上海市-长宁区-华阳路街道",
            title: "华阳路街道",
            children: [
              {
                key: "上海市-长宁区-华阳路街道-华阳路街道文化服务中心",
                title: "华阳路街道文化服务中心",
                children: [],
              },
              { key: "上海市-长宁区-华阳路街道-“海之韵”合唱团", title: "“海之韵”合唱团", children: [] },
            ],
          },
          {
            key: "上海市-长宁区-新华路街道",
            title: "新华路街道",
            children: [
              {
                key: "上海市-长宁区-新华路街道-新华路街道民俗文化中心",
                title: "新华路街道民俗文化中心",
                children: [],
              },
              {
                key: "上海市-长宁区-新华路街道-云荷苑荷塘月色戏剧队",
                title: "云荷苑荷塘月色戏剧队",
                children: [],
              },
            ],
          },
          {
            key: "上海市-长宁区-江苏路街道",
            title: "江苏路街道",
            children: [
              {
                key: "上海市-长宁区-江苏路街道-江苏路街道文化服务中心",
                title: "江苏路街道文化服务中心",
                children: [],
              },
              { key: "上海市-长宁区-江苏路街道-上钢合唱团", title: "上钢合唱团", children: [] },
            ],
          },
          {
            key: "上海市-长宁区-天山路街道",
            title: "天山路街道",
            children: [
              {
                key: "上海市-长宁区-天山路街道-天山路街道民俗文化中心",
                title: "天山路街道民俗文化中心",
                children: [],
              },
              {
                key: "上海市-长宁区-天山路街道-天山路街道说唱表演队",
                title: "天山路街道说唱表演队",
                children: [],
              },
            ],
          },
          {
            key: "上海市-长宁区-周家桥街道",
            title: "周家桥街道",
            children: [
              {
                key: "上海市-长宁区-周家桥街道-周家桥街道文化服务中心",
                title: "周家桥街道文化服务中心",
                children: [],
              },
            ],
          },
          {
            key: "上海市-长宁区-虹桥街道",
            title: "虹桥街道",
            children: [
              {
                key: "上海市-长宁区-虹桥街道-虹桥街道民俗文化中心",
                title: "虹桥街道民俗文化中心",
                children: [],
              },
              { key: "上海市-长宁区-虹桥街道-虹桥街道图书馆", title: "虹桥街道图书馆", children: [] },
            ],
          },
          {
            key: "上海市-长宁区-仙霞新村街道",
            title: "仙霞新村街道",
            children: [
              {
                key: "上海市-长宁区-仙霞新村街道-仙霞新村街道文化服务中心",
                title: "仙霞新村街道文化服务中心",
                children: [],
              },
            ],
          },
          {
            key: "上海市-长宁区-程家桥街道",
            title: "程家桥街道",
            children: [
              {
                key: "上海市-长宁区-程家桥街道-程家桥社区文化活动中心",
                title: "程家桥社区文化活动中心",
                children: [],
              },
            ],
          },
          {
            key: "上海市-长宁区-北新泾街道",
            title: "北新泾街道",
            children: [
              {
                key: "上海市-长宁区-北新泾街道-北新泾社区文化活动中心",
                title: "北新泾社区文化活动中心",
                children: [],
              },
            ],
          },
          {
            key: "上海市-长宁区-新泾镇",
            title: "新泾镇",
            children: [
              {
                key: "上海市-长宁区-新泾镇-新泾镇社区文化活动中心",
                title: "新泾镇社区文化活动中心",
                children: [],
              },
            ],
          },
          { key: "上海市-长宁区-长宁区博物馆", title: "长宁区博物馆", children: [] },
          {
            key: "上海市-长宁区-长宁区文化艺术中心",
            title: "长宁区文化艺术中心",
            children: [],
          },
          {
            key: "上海市-长宁区-长宁区少年儿童图书馆",
            title: "长宁区少年儿童图书馆",
            children: [],
          },
          {
            key: "上海市-长宁区-长宁区群众艺术馆馆",
            title: "长宁区群众艺术馆馆",
            children: [],
          },
          { key: "上海市-长宁区-长宁区非遗传承馆", title: "长宁区非遗传承馆", children: [] },
          { key: "上海市-长宁区-长宁区影剧院", title: "长宁区影剧院", children: [] },
        ],
      },
      {
        key: "上海市-浦东新区",
        title: "浦东新区",
        children: [
          {
            key: "高桥镇",
            title: "高桥镇",
            children: [
              {
                key: "高桥镇戏曲沙龙队",
                title: "高桥镇戏曲沙龙队",
                children: [],
              },
            ],
          },

          {
            key: "金桥镇",
            title: "金桥镇",
            children: [
              { key: "金桥镇合唱队", title: "金桥镇合唱队", children: [] },
            ],
          },

          { key: "浦东展览馆", title: "浦东展览馆", children: [] },
        ],
      },
      { key: "上海市-黄浦区", title: "黄浦区", children: [] },
      { key: "上海市-徐汇区", title: "徐汇区", children: [] },
      // 重复，暂时去掉，如果需要加上，须修改key值为“长宁区1”
      // { key: "长宁区", title: "长宁区", children: [] },
      { key: "上海市-静安区", title: "静安区", children: [] },
      { key: "上海市-普陀区", title: "普陀区", children: [] },
      { key: "上海市-虹口区", title: "虹口区", children: [] },
      { key: "上海市-杨浦区", title: "杨浦区", children: [] },
      { key: "上海市-闵行区", title: "闵行区", children: [] },
      { key: "上海市-宝山区", title: "宝山区", children: [] },
      { key: "上海市-嘉定区", title: "嘉定区", children: [] },
      { key: "上海市-金山区", title: "金山区", children: [] },
      { key: "上海市-松江区", title: "松江区", children: [] },
      { key: "上海市-青浦区", title: "青浦区", children: [] },
      { key: "上海市-奉贤区", title: "奉贤区", children: [] },
      { key: "上海市-崇明区", title: "崇明区", children: [] },
    ],
  },
];

export default contents;
