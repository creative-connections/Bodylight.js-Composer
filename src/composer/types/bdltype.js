export class Bdltype {
  static addToEditor(editor) {}

  static getseqid() {
    //console.log('getseqid', window.seqid);
    //window.seqid++;
    return 'id' + window.seqid++;
  }
  static getprevid1() {
    //console.log('getprevid1', window.seqid);
    let a = window.seqid - 1;
    //console.log('getprevid1 a', a);
    return 'id' + a;
  }
  static getprevid2() {
    //console.log('getprevid2', window.seqid);
    let a = window.seqid - 2;
    //console.log('getprevid2 a', a);
    return 'id' + a;
  }
}
