// 六度关系分析列表
export const dimensionRelationConfig = {
  includes: ['level', 'relation'],
  formatters: {
    level: {
      title: '路径层级'
    },
    relation: {
      title: '路径详情'
    }
  }
}

// 关系网分析、研判推演列表
export const networkRelationConfig = {
  includes: ['intimacy', 'object', 'dimension'],
  formatters: {
    intimacy: {
      title: '亲密度'
    },
    object: {
      title: '对象',
      width: 150
    },
    dimension: {
      title: '维度记录',
      width: 400
    }
  }
}

// 寻找情人分析列表
export const searchLoverkRelationConfig = {
  includes: ['suspiciousLevel', 'name', 'sex', 'idCard', 'suspiciousRecord'],
  formatters: {
    suspiciousLevel: {
      title: '可疑程度'
    },
    name: {
      title: '姓名'
    },
    sex: {
      title: '性别'
    },
    idCard: {
      title: '身份证号',
      width: 150
    },

    suspiciousRecord: {
      title: '可疑记录',
      width: 200
    }
  }
}

// 洗钱流出分析列表
export const moneyLaunderingRelationConfigOut = {
  includes: [
    'username',
    'card',
    'idCard',
    'cardType',
    'count',
    'amount',
    'percentage',
    'dealTime'
  ],
  formatters: {
    username: {
      title: '姓名'
    },
    card: {
      title: '卡号',
      width: 180
    },
    idCard: {
      title: '身份证号',
      width: 180
    },
    cardType: {
      title: '卡号类型'
    },
    amount: {
      title: '流出金额',
      width: 100
    },
    dealTime: {
      title: '流出金额时间',
      width: 180
    },
    percentage: {
      title: '流出百分比'
    },
    count: {
      title: '流出人数'
    }
  }
}

// 洗钱流入分析列表
export const moneyLaunderingRelationConfigIn = {
  includes: [
    'username',
    'card',
    'idCard',
    'cardType',
    'count',
    'amount',
    'percentage',
    'dealTime'
  ],
  formatters: {
    username: {
      title: '姓名'
    },
    card: {
      title: '卡号',
      width: 180
    },
    idCard: {
      title: '身份证号',
      width: 180
    },
    cardType: {
      title: '卡号类型'
    },
    amount: {
      title: '流入金额',
      width: 100
    },
    dealTime: {
      title: '流入金额时间',
      width: 180
    },
    percentage: {
      title: '流入百分比'
    },
    count: {
      title: '流入人数'
    }
  }
}

// 共同关系人分析列表
export const commonRelationConfig = {
  includes: ['num', 'realName', 'idCard', 'detail'],
  formatters: {
    num: {
      title: '关联分析人数'
    },
    realName: {
      title: '共同联系人'
    },
    idCard: {
      title: '身份证号',
      width: 180
    },
    detail: {
      title: '关联分析人详情',
      width: 400
    }
  }
}

// 企业主要人员
export const colleagueConfig = {
  // includes: ["xm", "zjhm", "tyshxydm", "ztmc", "zw"],
  // formatters: {
  //     xm: { title: "姓名" },
  //     zjhm: { title: "证件号码", width: 140 },
  //     tyshxydm: { title: "统一社会信用代码", width: 140 },
  //     ztmc: { title: "主体名称", width: 120 },
  //     zw: { title: "职务" }
  // }
  // after
  includes: ['ztmc', 'tyshxydm', 'xm', 'zjhm', 'zw'],
  formatters: {
    xm: { title: '人员姓名' },
    zjhm: { title: '证件号码', width: 140 },
    tyshxydm: { title: '统一社会信用代码', width: 140 },
    ztmc: { title: '企业名称', width: 120 },
    zw: { title: '担任职务' }
  }
}

// 同行-飞机
export const flyConfig = {
  // includes: [
  //     "qfgzszdm",
  //     "ddhzszdm",
  //     "hbh",
  //     "hbrq",
  //     "hkgsdm",
  //     "lkxm",
  //     "lkzwxm",
  //     "dflkxm",
  //     "dflkzwxm",
  //     "xb",
  //     "zjhm",
  //     "lgsj",
  //     "lgrq",
  //     "lkzwxx",
  //     "dfxb",
  //     "dfzjhm",
  //     "dflkzwxx"
  // ],
  // formatters: {
  //     qfgzszdm: { title: "起飞港站三字代码", width: 120 },
  //     ddhzszdm: { title: "到达航站三字代码", width: 120 },
  //     hbh: { title: "航班号" },
  //     hbrq: { title: "航班日期" },
  //     hkgsdm: { title: "航空公司代码", width: 110 },
  //     lkxm: { title: "旅客姓名" },
  //     lkzwxm: { title: "旅客中文姓名", width: 110 },
  //     dflkxm: { title: "对方旅客姓名", width: 110 },
  //     dflkzwxm: { title: "对方旅客中文姓名", width: 120 },
  //     xb: { title: "性别" },
  //     zjhm: { title: "证件号码", width: 140 },
  //     lgsj: { title: "离港时间", width: 130 },
  //     lgrq: { title: "离港日期" },
  //     lkzwxx: { title: "旅客座位信息", width: 110 },
  //     dfxb: { title: "对方性别" },
  //     dfzjhm: { title: "对方证件号码", width: 140 },
  //     dflkzwxx: { title: "对方旅客座位信息", width: 120 }
  // }
  includes: ['lkxx', 'qfgzszdm', 'ddhzszdm', 'zwh', 'hbxx', 'lgsj'],
  formatters: {
    lkxx: {
      title: '旅客信息',
      formatter (val, row) {
        const { lkzwxm, zjhm } = row
        const { dflkzwxm, dfzjhm } = row
        const lineOne = lkzwxm + (zjhm ? `(${zjhm})` : '')
        const lineTwo = dflkzwxm + (dfzjhm ? `(${dfzjhm})` : '')
        return lineOne + '\n' + lineTwo
      }
    },
    qfgzszdm: { title: '起飞站', width: 120 },
    ddhzszdm: { title: '到达站', width: 120 },
    zwh: {
      title: '座位号',
      formatter (val, row) {
        return (row.lkzwxx || '-') + '\n' + (row.dflkzwxx || '-')
      }
    },
    hbxx: {
      title: '航班信息',
      formatter (val, row) {
        const { hkgsdm, hbrq, hbh } = row
        const htmlStr = [hkgsdm, hbrq, hbh]
          .filter(
            item =>
              item !== null && item !== undefined && item !== ''
          )
          .join(' / ')
        return htmlStr
      }
    },
    lgsj: {
      title: '离港时间'
    }
  }
}

// 银行卡转账
export const transferConfig = {
  // includes: [
  //     "mc",
  //     "ye",
  //     "jdbz",
  //     "zjhm",
  //     "jywdmc",
  //     "jysj",
  //     "jyrq",
  //     "jylx",
  //     "jylsh",
  //     "jyfsd",
  //     "jydsye",
  //     "jydfzjhm",
  //     "jydfxm",
  //     "jydfkh",
  //     "je",
  //     "bz",
  //     "cxkh"
  // ],
  // formatters: {
  //     mc: { title: "名称" },
  //     ye: { title: "交易余额" },
  //     jdbz: { title: "借贷标志" },
  //     zjhm: { title: "证件号码", width: 140 },
  //     jywdmc: { title: "交易网点名称", width: 110 },
  //     jysj: { title: "交易时间", width: 130 },
  //     jyrq: { title: "交易日期" },
  //     jylx: { title: "交易类型" },
  //     jylsh: { title: "交易流水号", width: 100 },
  //     jyfsd: { title: "交易发生地", width: 100 },
  //     jydsye: { title: "交易对手余额", width: 110 },
  //     jydfzjhm: { title: "对方证件号", width: 140 },
  //     jydfxm: { title: "交易对方名称", width: 110 },
  //     jydfkh: { title: "对方卡号", width: 140 },
  //     je: { title: "交易金额" },
  //     bz: { title: "币种" },
  //     cxkh: { title: "查询卡号", width: 140 }
  // }
  includes: ['gldx1', 'jybz', 'gldx2', 'jysj'],
  formatters: {
    gldx1: {
      title: '关联对象',
      formatter (val, row) {
        return row.mc + ' / ' + row.zjhm
      }
    },
    jybz: {
      title: '标志+交易金额',
      formatter (val, row) {
        const { jdbz, je } = row
        const str = (jdbz === '进' ? '+' : '-') + je
        return str
      }
    },
    gldx2: {
      title: '关联对象',
      formatter (val, row) {
        return row.jydfxm + ' / ' + row.jydfzjhm
      }
    },
    jysj: {
      title: '交易时间'
    }
  }
}

// 交易记录
export const transferRecordConfig = {
  includes: [
    'mc',
    'ye',
    'je',
    'jdbz',
    'zjhm',
    'jywdmc',
    'jysj',
    'jyrq',
    'jylx',
    'jylsh',
    'jyfsd',
    'jydsye',
    'jydfzjhm',
    'jydfxm',
    'jydfkh',
    'bz',
    'cxkh'
  ],
  formatters: {
    mc: { title: '名称' },
    ye: { title: '交易余额' },
    je: { title: '交易金额' },
    jdbz: { title: '借贷标志' },
    zjhm: { title: '证件号码', width: 140 },
    jywdmc: { title: '交易网点名称', width: 110 },
    jysj: { title: '交易时间', width: 130 },
    jyrq: { title: '交易日期' },
    jylx: { title: '交易类型' },
    jylsh: { title: '交易流水号', width: 100 },
    jyfsd: { title: '交易发生地', width: 100 },
    jydsye: { title: '交易对手余额', width: 110 },
    jydfzjhm: { title: '对方证件号', width: 140 },
    jydfxm: { title: '交易对方名称', width: 110 },
    jydfkh: { title: '对方卡号', width: 140 },
    bz: { title: '币种' },
    cxkh: { title: '查询卡号', width: 140 }
  }
}

// 同住
export const liveConfig = {
  includes: [
    'ldmc',
    'ldxxdz',
    'xm',
    'xb',
    'sfzmhm',
    'sfzmmc',
    'rzrq',
    'rzfh',
    'rzsj',
    'tfsj',
    'duration',
    'dfxm',
    'dfxb',
    'dfsfzmmc',
    'dfsfzmhm',
    'dfrzfh',
    'dfrzsj',
    'dftfsj',
    'dfduration'
  ],
  formatters: {
    ldmc: { title: '旅店名称' },
    ldxxdz: { title: '旅店详细地址', width: 150 },
    xm: { title: '姓名' },
    xb: { title: '性别' },
    sfzmhm: { title: '证件号码', width: 140 },
    sfzmmc: { title: '身份证明名称', width: 110 },
    rzrq: { title: '本方入住日期', width: 110 },
    rzfh: { title: '入住房号' },
    rzsj: { title: '入住时间', width: 130 },
    tfsj: { title: '退房时间', width: 130 },
    duration: { title: '住宿时长' },
    dfxm: { title: '对方名称' },
    dfxb: { title: '对方性别' },
    dfsfzmmc: { title: '对方身份证明名称', width: 130 },
    dfsfzmhm: { title: '对方证件号码', width: 140 },
    dfrzfh: { title: '对方入住房号', width: 110 },
    dfrzsj: { title: '对方入住时间', width: 130 },
    dftfsj: { title: '对方退房时间', width: 130 },
    dfduration: { title: '对方住宿时长', width: 110 }
  }
}

// 同行-大巴
export const busConfig = {
  // includes: [
  //     "bccx",
  //     "bch",
  //     "fcrq",
  //     "bclx",
  //     "ccrxm",
  //     "dfccrxm",
  //     "ccrzjlx",
  //     "zjhm",
  //     "zwh",
  //     "cph",
  //     "cpjg",
  //     "qpsj",
  //     "mddmc",
  //     "sfczmc",
  //     "sfczbm",
  //     "dfzjhm",
  //     "dfzwh",
  //     "dfccrzjlx",
  //     "dfcpjg",
  //     "dfmddmc"
  // ],
  // formatters: {
  //     bccx: { title: "班车车型" },
  //     bch: { title: "班次号" },
  //     fcrq: { title: "发车日期" },
  //     bclx: { title: "班次类型" },
  //     ccrxm: { title: "乘车人姓名" },
  //     dfccrxm: { title: "对方乘车人姓名", width: 120 },
  //     ccrzjlx: { title: "乘车人证件类型", width: 120 },
  //     zjhm: { title: "证件号码", width: 140 },
  //     zwh: { title: "座位号" },
  //     cph: { title: "车牌号" },
  //     cpjg: { title: "车票价格" },
  //     qpsj: { title: "取票时间", width: 130 },
  //     mddmc: { title: "目的地名称", width: 140 },
  //     sfczmc: { title: "始发车站名称", width: 140 },
  //     sfczbm: { title: "始发车站编码", width: 110 },
  //     dfzjhm: { title: "对方证件号码", width: 140 },
  //     dfzwh: { title: "对方座位号", width: 110 },
  //     dfccrzjlx: { title: "对方乘车人证件类" },
  //     dfcpjg: { title: "对方车票价格", width: 110 },
  //     dfmddmc: { title: "对方目的地名称", width: 140 }
  // }
  includes: ['ccrxm', 'sfczmc', 'mddmc', 'zwh', 'bcxx'],
  formatters: {
    ccrxm: {
      title: '个人信息',
      formatter (val, row) {
        const { ccrxm, zjhm } = row
        const { dfccrxm, dfzjhm } = row
        const lineOne = ccrxm + (zjhm ? `(${zjhm})` : '')
        const lineTwo = dfccrxm + (dfzjhm ? `(${dfzjhm})` : '')
        console.log(row)
        console.log(lineOne)
        console.log(lineTwo)
        return (lineOne || '-') + '\n' + (lineTwo || '-')
      }
    },
    sfczmc: {
      title: '始发站',
      formatter (val, row) {
        return (row.sfczmc || '-') + '\n' + (row.sfczmc || '-')
      }
    },
    mddmc: {
      title: '到达站',
      formatter (val, row) {
        return (row.mddmc || '-') + '\n' + (row.dfmddmc || '-')
      }
    },
    zwh: {
      title: '座位号',
      formatter (val, row) {
        return (row.zwh || '-') + '\n' + (row.dfzwh || '-')
      }
    },
    bcxx: {
      title: '班次信息',
      formatter (val, row) {
        const { fcrq, bch } = row
        const htmlStr = [fcrq, bch]
          .filter(
            item =>
              item !== null && item !== undefined && item !== ''
          )
          .join(' / ')
        return htmlStr
      }
    }
  }
}

// 同行-火车
export const trainConfig = {
  // includes: [
  //     "ch",
  //     "fcrq",
  //     "xm",
  //     "zjhm",
  //     "zwh",
  //     "dz",
  //     "fz",
  //     "dfxm",
  //     "dfzjhm",
  //     "dfzwh",
  //     "dfcxh",
  //     "dfdz",
  //     "dffz"
  // ],
  // formatters: {
  //     ch: { title: "车号" },
  //     fcrq: { title: "发车日期" },
  //     xm: { title: "姓名" },
  //     zjhm: { title: "证件号码", width: 140 },
  //     zwh: { title: "座位号" },
  //     dz: { title: "到站" },
  //     fz: { title: "发站" },
  //     dfxm: { title: "对方姓名" },
  //     dfzjhm: { title: "对方证件号码", width: 140 },
  //     dfzwh: { title: "对方座位号", width: 100 },
  //     dfcxh: { title: "对方车厢号", width: 100 },
  //     dfdz: { title: "对方到站" },
  //     dffz: { title: "对方发站" }
  // }
  includes: ['grxx', 'qsz', 'ddz', 'cxh', 'fcrq'],
  formatters: {
    grxx: {
      title: '个人信息',
      formatter (val, row) {
        const { xm, zjhm } = row
        const { dfxm, dfzjhm } = row
        const lineOne = xm + (zjhm ? `(${zjhm})` : '')
        const lineTwo = dfxm + (dfzjhm ? `(${dfzjhm})` : '')
        return (lineOne || '-') + '\n' + (lineTwo || '-')
      }
    },
    qsz: {
      title: '起始站',
      formatter (val, row) {
        return (row.fz || '-') + '\n' + (row.dffz || '-')
      }
    },
    ddz: {
      title: '到达站',
      formatter (val, row) {
        return (row.dz || '-') + '\n' + (row.dfdz || '-')
      }
    },
    cxh: {
      title: '车厢号/座位号',
      formatter (val, row) {
        const { cxh, zwh } = row
        const { dfcxh, dfzwh } = row
        const lineOne = [cxh, zwh]
          .filter(
            item =>
              item !== null && item !== undefined && item !== ''
          )
          .join(' / ')
        const lineTwo = [dfcxh, dfzwh]
          .filter(
            item =>
              item !== null && item !== undefined && item !== ''
          )
          .join(' / ')
        return (lineOne || '-') + '\n' + (lineTwo || '-')
      }
    },
    fcrq: {
      title: '发车日期/车次号',
      formatter (val, row) {
        const { fcrq, ch } = row
        const htmlStr = [fcrq, ch]
          .filter(
            item =>
              item !== null && item !== undefined && item !== ''
          )
          .join(' / ')
        return htmlStr
      }
    }
  }
}

// 投资
export const investConfig = {
  // includes: [
  //     "gdxm",
  //     "gdgb",
  //     "gdlx",
  //     "qymc",
  //     "zjhm",
  //     "zzhm",
  //     "tyshxydm",
  //     "rjczbl",
  //     "rjczbz",
  //     "rjczfs",
  //     "rjczrq",
  //     "rjczjewy",
  //     "rjczsj"
  // ],
  // formatters: {
  //     gdxm: { title: "股东姓名" },
  //     gdgb: { title: "股东国别" },
  //     gdlx: { title: "股东类型" },
  //     qymc: { title: "企业名称" },
  //     zjhm: { title: "证件号码", width: 140 },
  //     zzhm: { title: "证照号码", width: 140 },
  //     tyshxydm: { title: "统一社会信用代码", width: 140 },
  //     rjczbl: { title: "认缴出资比例", width: 110 },
  //     rjczbz: { title: "认缴出资币种", width: 110 },
  //     rjczfs: { title: "认缴出资方式", width: 110 },
  //     rjczrq: { title: "认缴出资日期", width: 110 },
  //     rjczjewy: { title: "认缴出资金额（万元）", width: 130 },
  //     rjczsj: { title: "认缴出资时间", width: 110 }
  // }
  includes: [
    'qymc',
    'tyshxydm',
    'gdxm',
    'gdlx',
    'rjczbl',
    'rjczjewy',
    'rjczrq'
  ],
  formatters: {
    qymc: { title: '企业名称' },
    tyshxydm: {
      title: '统一社会信用代码',
      width: 180
    },
    gdxm: {
      title: '股东姓名',
      formatter (val, row) {
        const { gdxm, zjhm } = row
        const str = gdxm + (zjhm ? `(${zjhm})` : '')
        return str
      }
    },
    gdlx: { title: '股东类型' },
    rjczbl: { title: '认缴出资比例', width: 110 },
    rjczjewy: {
      title: '认缴出资金额（万元）',
      width: 180
    },
    rjczrq: { title: '认缴出资日期', width: 110 }
  }
}

// 同户
export const familyConfig = {
  // includes: [
  //     "jggjdq",
  //     "xm",
  //     "xb",
  //     "zjhm",
  //     "zzxz",
  //     "csrq",
  //     "cym",
  //     "csdssx",
  //     "csdgjdq",
  //     "yhzgx",
  //     "ssssxq",
  //     "sspcsmc",
  //     "sg",
  //     "mz",
  //     "jgssxq",
  //     "jggjdq",
  //     "fwsc",
  //     "dfxm",
  //     "dfsg",
  //     "dfmz",
  //     "dfxb",
  //     "dfjgssxq",
  //     "dfyhzgx",
  //     "dfzjhm",
  //     "dfzzxz",
  //     "dfssssxq",
  //     "dfsspcsmc"
  // ],
  // formatters: {
  //     jggjdq: { title: "籍贯国家" },
  //     xm: { title: "姓名" },
  //     xb: { title: "性别" },
  //     zjhm: { title: "身份证号", width: 140 },
  //     zzxz: { title: "住址详址", width: 130 },
  //     csrq: { title: "出生日期" },
  //     cym: { title: "曾用名" },
  //     csdssx: { title: "出生地省市县", width: 120 },
  //     csdgjdq: { title: "出生地国家", width: 100 },
  //     yhzgx: { title: "与户主关系", width: 100 },
  //     ssssxq: { title: "所属省市县" },
  //     sspcsmc: { title: "所属派出所名称", width: 120 },
  //     sg: { title: "身高" },
  //     mz: { title: "民族" },
  //     jgssxq: { title: "籍贯省市县", width: 100 },
  //     fwsc: { title: "服务所处" },
  //     dfxm: { title: "对方姓名" },
  //     dfsg: { title: "对方身高" },
  //     dfmz: { title: "对方民族" },
  //     dfxb: { title: "对方性别" },
  //     dfjgssxq: { title: "对方籍贯省市县", width: 120 },
  //     dfyhzgx: { title: "对方与户主关系", width: 120 },
  //     dfzjhm: { title: "对方身份证号", width: 110 },
  //     dfzzxz: { title: "对方住址详址", width: 110 },
  //     dfssssxq: { title: "对方所属省市县", width: 120 },
  //     dfsspcsmc: { title: "对方所属派出所名称", width: 130 }
  // }
  includes: ['gldx1', 'yhzgx', 'gldx2', 'dfyhzgx'],
  formatters: {
    gldx1: {
      title: '关联对象',
      formatter (val, row) {
        let { xm, xb, zjhm, mz } = row
        xb = '性别：' + xb
        return [xm, xb, zjhm, mz].filter(item => item).join(' / ')
      }
    },
    yhzgx: { title: '与户主关系', width: 100 },
    gldx2: {
      title: '关联对象',
      formatter (val, row) {
        let { dfxm, dfxb, dfzjhm, dfmz } = row
        dfxb = '性别：' + dfxb
        return [dfxm, dfxb, dfzjhm, dfmz]
          .filter(item => item)
          .join(' / ')
      }
    },
    dfyhzgx: { title: '与户主关系', width: 100 }
  }
}

// 同行
export const togetherConfig = {
  includes: [
    'name',
    'otherName',
    'travelType',
    'travelNumber',
    'travelDate',
    'licenseNumber',
    'startSite',
    'sex',
    'idCard',
    'seat',
    'otherSex',
    'otherIdCard',
    'otherSeat'
  ],
  formatters: {
    name: { title: '姓名' },
    otherName: { title: '对方姓名' },
    travelType: { title: '交通类型' },
    travelNumber: { title: '交通班次' },
    travelDate: { title: '交通日期' },
    licenseNumber: { title: '交通工具号' },
    startSite: { title: '始发地点' },
    sex: { title: '性别' },
    idCard: { title: '证件号码', width: 170 },
    seat: { title: '座次信息' },
    otherSex: { title: '对方性别' },
    otherIdCard: { title: '对方证件号码', width: 170 },
    otherSeat: { title: '对方座次信息' }
  }
}

// 交易异常
export const transferException = {
  includes: [
    'mc',
    'jydfxm',
    'je',
    'exceptionType',
    'ye',
    'jdbz',
    'zjhm',
    'jywdmc',
    'jysj',
    'jyrq',
    'jylx',
    'jylsh',
    'jyfsd',
    'jydsye',
    'jydfzjhm',
    'jydfkh',
    'bz',
    'cxkh'
  ],
  formatters: {
    mc: { title: '名称' },
    jydfxm: { title: '交易对方名称' },
    je: { title: '交易金额' },
    exceptionType: { title: '异常类型' },
    ye: { title: '交易余额' },
    jdbz: { title: '借贷标志' },
    zjhm: { title: '证件号码', width: 170 },
    jywdmc: { title: '交易网点名称', width: 170 },
    jysj: { title: '交易时间', width: 150 },
    jyrq: { title: '交易日期' },
    jylx: { title: '交易类型' },
    jylsh: { title: '交易流水号', width: 170 },
    jyfsd: { title: '交易发生地', width: 170 },
    jydsye: { title: '交易对手余额' },
    jydfzjhm: { title: '对方证件号', width: 170 },
    jydfkh: { title: '对方卡号', width: 170 },
    bz: { title: '币种' },
    cxkh: { title: '查询卡号', width: 170 }
  }
}

// 洗钱特征分析 图标详情
export const moneyLaunderingRelationConfigDetail = {
  includes: [
    'username',
    'card',
    'idCard',
    'cardType',
    'amount',
    'percentage',
    'dealTime'
  ],
  formatters: {
    username: {
      title: '对方姓名'
    },
    card: {
      title: '对方账号',
      width: 180
    },
    idCard: {
      title: '对方身份证号',
      width: 180
    },
    cardType: {
      title: '账号类型'
    },
    amount: {
      title: '交易金额',
      width: 100
    },
    dealTime: {
      title: '交易时间',
      width: 180
    },
    percentage: {
      title: '流入百分比'
    }
  }
}
function formatAddr (row) {
  const unit = {
    mp: '号',
    fh: '号',
    dh: '栋',
    dy: '单元',
    lc: '层',
    fh2: '号'
  }
  const units = Object.entries(unit)
  //  mp"门牌号",fh"附号",dh"栋号", dy"单元", lc"楼层", fh2"房号"
  const { szq, jd } = row
  let str = szq + jd
  units.map(item => {
    const [key, value] = item
    if (row[key]) {
      str += row[key] + value
    }
  })
  return str
}
// 房产分析名下房产
export const realestateAnalysis_zero = {
  includes: [
    'address',
    'mj',
    'je',
    'yt',
    'ryXm',
    'ryZjh',
    'fe',
    'gyfs',
    'dyzt',
    'cfzt',
    'djzt',
    'qdfs',
    'djsj',
    'ssXm',
    'ssZjh',
    'xsXm',
    'xsZjh'
  ],
  formatters: {
    address: {
      title: '地址',
      width: 270,
      formatter: (val, row) => {
        return formatAddr(row)
      }
    },
    mj: {
      title: '面积',
      formatter: val => {
        return val + 'cm²'
      }
    },
    je: {
      title: '金额',
      formatter: val => {
        return val + '元'
      }
    },
    yt: { title: '用途' },
    ryXm: { title: '所属人' },
    ryZjh: { title: '身份证号', width: 170 },
    fe: { title: '份额' },
    gyfs: {
      title: '共有方式',
      formatter: val => {
        switch (val) {
          case '1':
            return '夫妻共有'
          case '2':
            return '家庭共有'
          case '3':
            return '合伙共有'
          case '4':
            return '合资共有'
          default:
        }
      }
    },
    dyzt: { title: '抵押状态' },
    cfzt: { title: '查封状态' },
    djzt: { title: '登记状态' },
    qdfs: { title: '取得方式' },
    djsj: { title: '登记时间', width: 140 },
    ssXm: { title: '上手人姓名', width: 100 },
    ssZjh: { title: '上手人身份证号', width: 170 },
    xsXm: { title: '下手人姓名', width: 100 },
    xsZjh: { title: '下手人身份证号', width: 170 }
  }
}

// 房产分析家庭房产
export const realestateAnalysis_one = {
  includes: [
    'address',
    'mj',
    'je',
    'yt',
    'ryXm',
    'ryZjh',
    'yhzgx',
    'fe',
    'gyfs',
    'dyzt',
    'cfzt',
    'djzt',
    'qdfs',
    'djsj',
    'ssXm',
    'ssZjh',
    'xsXm',
    'xsZjh'
  ],
  formatters: {
    address: {
      title: '地址',
      width: 270,
      formatter: (val, row) => {
        return formatAddr(row)
      }
    },
    mj: {
      title: '面积',
      formatter: val => {
        return val + 'cm²'
      }
    },
    je: {
      title: '金额',
      formatter: val => {
        return val + '元'
      }
    },
    yt: { title: '用途' },
    ryXm: { title: '所属人' },
    ryZjh: { title: '身份证号', width: 170 },
    yhzgx: { title: '与分析人家庭关系', width: 170 },
    fe: { title: '份额' },
    gyfs: {
      title: '共有方式',
      formatter: val => {
        switch (val) {
          case '1':
            return '夫妻共有'
          case '2':
            return '家庭共有'
          case '3':
            return '合伙共有'
          case '4':
            return '合资共有'
          default:
        }
      }
    },
    dyzt: { title: '抵押状态' },
    cfzt: { title: '查封状态' },
    djzt: { title: '登记状态' },
    qdfs: { title: '取得方式' },
    djsj: { title: '登记时间', width: 140 },
    ssXm: { title: '上手人姓名', width: 100 },
    ssZjh: { title: '上手人身份证号', width: 170 },
    xsXm: { title: '下手人姓名', width: 100 },
    xsZjh: { title: '下手人身份证号', width: 170 }
  }
}

// 碰面分析模型
export const meetAnalysis = {
  includes: ['meetingNames', 'intervalsTime', 'distance', 'address'],
  formatters: {
    meetingNames: { title: '碰面人员' },
    intervalsTime: { title: '间隔时间' },
    distance: { title: '间隔距离' },
    address: { title: '地址' }
  }
}
// 多时空伴随
export const dskbsAnalysis = {
  includes: [
    'accompanyPersons',
    'intervalsTime',
    'distance',
    'mainPerson',
    'typeName',
    'time',
    'place'
  ],
  formatters: {
    accompanyPersons: { title: '伴随人员' },
    intervalsTime: { title: '间隔时间' },
    distance: { title: '间隔距离' },
    mainPerson: { title: '主体人员' },
    typeName: { title: '维度' },
    time: { title: '发生时间' },
    place: { title: '地址' }
  }
}

// 多时空分析
export const multiSpaceAnalysis = {
  includes: ['eventTotalNum', 'date', 'sjnr'],
  formatters: {
    eventTotalNum: { title: '事件总频次' },
    date: { title: '时间' },
    sjnr: { title: '事件内容', width: 500 }
  }
}

// 出行-车辆卡口
export const multiSpace_1 = {
  includes: [
    'jdcsyr',
    'cthphm',
    'kkmc',
    'kkjd',
    'kkwd',
    'rksj',
    'gcrq',
    'gcsj',
    'sfzmhm',
    'cllx',
    'clpp1'
  ],
  formatters: {
    jdcsyr: { title: '机动车所有人', width: 120 },
    cthphm: { title: '车牌号', width: 170 },
    kkmc: { title: '卡口名称', width: '' },
    kkjd: { title: '卡口经度', width: 150 },
    kkwd: { title: '卡口纬度', width: 150 },
    rksj: { title: '入卡时间', width: 150 },
    gcrq: { title: '过车日期', width: '' },
    gcsj: { title: '过车时间', width: 150 },
    sfzmhm: { title: '证件号码', width: 170 },
    cllx: { title: '车辆类型', width: 180 },
    clpp1: { title: '车辆品牌', width: '' }
  }
}

// 出行-高速公路-2020年前
export const multiSpace_2 = {
  includes: [
    'jdcsyr',
    'rkcp',
    'ckrq',
    'cksj',
    'cksfzmc',
    'rkrq',
    'rksj',
    'rksfzmc',
    'rksj2',
    'cksj',
    'sjlcm',
    'rkcx'
  ],
  formatters: {
    jdcsyr: { title: '机动车所有人', width: 110 },
    rkcp: { title: '入口车牌', width: 110 },
    ckrq: { title: '出口日期', width: '' },
    cksj: { title: '出口时间', width: 150 },
    cksfzmc: { title: '出口收费站名称', width: 120 },
    rkrq: { title: '入口日期', width: '' },
    rksj: { title: '入口时间', width: 150 },
    rksfzmc: { title: '入口收费站名称', width: 120 },
    rksj2: { title: '入口时间', width: 150 },
    sjlcm: { title: '实际里程(米)', width: 170 },
    rkcx: { title: '入口车型', width: '' }
  }
}

// 出行-高速公路-2020年后
export const multiSpace_3 = {
  includes: [
    'jdcsyr',
    'rkcp',
    'ckrq',
    'cksj',
    'cksfzmc',
    'rkrq',
    'rksj',
    'rksfzmc',
    'rksj2',
    'cksj',
    'sjlcm',
    'rkcx'
  ],
  formatters: {
    jdcsyr: { title: '机动车所有人', width: 110 },
    rkcp: { title: '入口车牌', width: 110 },
    ckrq: { title: '出口日期', width: '' },
    cksj: { title: '出口时间', width: 150 },
    cksfzmc: { title: '出口收费站名称', width: 120 },
    rkrq: { title: '入口日期', width: '' },
    rksj: { title: '入口时间', width: 150 },
    rksfzmc: { title: '入口收费站名称', width: 120 },
    rksj2: { title: '入口时间', width: 150 },
    sjlcm: { title: '实际里程(米)', width: 170 },
    rkcx: { title: '入口车型', width: '' }
  }
}

// 民航离港
export const multiSpace_4 = {
  includes: ['lgsj', 'lkzwxm', 'jgsj', 'ddhzszdm', 'qfgzszdm'],
  formatters: {
    lgsj: { title: '离港时间', width: 150 },
    lkzwxm: { title: '旅客名' },
    jgsj: { title: '进港时间', width: 170 },
    ddhzszdm: { title: '到达航站三字代码', width: 170 },
    qfgzszdm: { title: '起飞港站三字代码', width: 170 }
  }
}

// 铁路订票
export const multiSpace_5 = {
  includes: [
    'xm',
    'xb',
    'zjhm',
    'fz',
    'ch',
    'cxh',
    'zwh',
    'dz',
    'fcrq',
    'cpzt'
  ],
  formatters: {
    xm: { title: '姓名', width: '' },
    xb: { title: '性别', width: '' },
    zjhm: { title: '证件号码', width: 150 },
    fz: { title: '发站', width: 170 },
    ch: { title: '车号', width: '' },
    cxh: { title: '车厢号', width: '' },
    zwh: { title: '座位号', width: '' },
    dz: { title: '到站', width: 180 },
    fcrq: { title: '发车日期', width: 90 },
    cpzt: { title: '车票状态', width: '' }
  }
}

// 运管售票
export const multiSpace_6 = {
  includes: [
    'ccrxm',
    'cpjg',
    'bccx',
    'bch',
    'zjhm',
    'ccrzjlx',
    'cph',
    'cplx',
    'FCSJ',
    'gpcgsj',
    'mddmc',
    'qpsj',
    'sfczbm',
    'sfczmc',
    'tpje',
    'tpsj',
    'xsqdbm',
    'zwh'
  ],
  formatters: {
    ccrxm: { title: '乘车人姓名', width: 100 },
    cpjg: { title: '车票价格', width: '' },
    bccx: { title: '班次车型', width: '' },
    bch: { title: '班次号', width: '' },
    zjhm: { title: '证件号码', width: 150 },
    ccrzjlx: { title: '乘车人证件类型', width: 120 },
    cph: { title: '车牌号', width: '' },
    cplx: { title: '车票类型', width: '' },
    FCSJ: { title: '发车时间', width: 150 },
    gpcgsj: { title: '购票成功时间', width: 110 },
    mddmc: { title: '目的地名称', width: 100 },
    qpsj: { title: '取票时间', width: 150 },
    sfczbm: { title: '始发车站编码', width: 110 },
    sfczmc: { title: '始发车站名称', width: 110 },
    tpje: { title: '退票金额', width: '' },
    tpsj: { title: '退票时间', width: 150 },
    xsqdbm: { title: '销售渠道编码', width: 110 },
    zwh: { title: '座位号', width: '' }
  }
}

// 旅馆住宿
export const multiSpace_7 = {
  includes: ['xm', 'xb', 'rzfh', 'sfzmhm', 'ldmc', 'ldxxdz', 'rzfh', 'tfsj'],
  formatters: {
    xm: { title: '姓名', width: '' },
    xb: { title: '性别', width: '' },
    rzfh: { title: '入住时间', width: '' },
    sfzmhm: { title: '身份证明号码', width: 170 },
    ldmc: { title: '旅店名称', width: 180 },
    ldxxdz: { title: '旅店详细地址', width: 170 },
    tfsj: { title: '退房时间', width: 170 }
  }
}

// 企业投资
export const multiSpace_8 = {
  includes: ['qymc', 'tyshxydm', 'gdlx', 'gdxm'],
  formatters: {
    qymc: { title: '企业名称', width: 150 },
    tyshxydm: { title: '统一社会信用代码', width: 180 },
    gdlx: { title: '股东类型' },
    gdxm: { title: '股东姓名' }
  }
}

// 账户交易
export const multiSpace_9 = {
  includes: ['rwlsh', 'sqjgdm', 'mbjgdm', 'jylx', 'je'],
  formatters: {
    rwlsh: { title: '任务流水号', width: 150 },
    sqjgdm: { title: '申请机构代码', width: 120 },
    mbjgdm: { title: '目标机构代码', width: 120 },
    jylx: { title: '交易类型' },
    je: { title: '交易金额' }
  }
}

// 落脚点分析
export const ljdfxAnalysis = {
  includes: ['name', 'idCard', 'count', 'address'],
  formatters: {
    name: { title: '姓名', width: 150 },
    idCard: { title: '身份证号', width: 120 },
    count: { title: '事件频次', width: 120 },
    address: { title: '地址' }
  }
}
