const assert     = require('assert');
const Completium = require('@completium/completium-cli');

const test = async () => {
  const completium = new Completium ();
  await completium.setAccount('admin');
  await completium.originate('ideabox.arl', {
    init: '(@' + completium.getAddress('admin') + ',5)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x1a85302e204e0860760ce002008b409e2825bc0c607b015d631100ccf49100ddc28e7880,0x248020ee0f60ae03602621812c0d60531005c22003809c25c2019c34c00b010d311838d2a06109f5c03a100630803b129037c790803741497807310016c9324c55f004f10a2d2634f8abf1054e44062569c24247945eb4f88006a9bb6e9220e15358cb85102b1be4ea054b2fa60cae4d4b42ad020e868b83ed0c204485c923230106058380410e20c58141800466826ea543050180066ac8518b27c682a9c001299681ac2b2ba6af89a540ada2eb9f98d0a484aaaaee696d62e95303e7e887c529c00ca10b2185d68bcaed0c530e134b316d0d620b61a5a3a7a6ead2000828bea8e0f8848e2d237870626b1968b8038096c9575b80a6de12041529510190b8507c14c54001a3a081a81a6c9e1245e3c01d784832be978080c84050203ab0806888625448011a83406e06d061014632a98e6571b0d46adc841f0b83c95b28b1a07914828b452be84ee41c09170557c1483010902f0d059000a9d86ec21e2c970507bbb080)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x1285306e096620040e204302d8804e06718184036057008c6015403b1c07b018c06b100130108800,0x0a87b0040ee01620b6604b00b996043027980c6201db6029804e7803460092612502780d6558033800e85a4c06623134c00ae2cd1e00262cc086e54c6700c27cd803a308561b00362032142934589cc291c1207b31102d26d426002a9e64848c065246893e80f4f345a189a240c181c873898209b3e2c8292aaaf3f0820bf00399a2c3d1a581e21110db2023eaa8020819c5a22b10a9a86b6aebdb521001ba11e182f20a47b6d30821a0b3c3d14b7370936580038a679983ca6a08011a39e36b6032b8d382c16360999b10b2a803abda0d8306e2c2c377216349a9e1f4b00cb1224823d5f135c954276cc0c44200169e8ef64209bcd35991de68b15939d69b231f12e1d68905bc46583a896e63a1b120c8282b0be084d1a1f8f8bcb7190c73009c4929142d010925c6c1f14742602eed08cae2e1a64ab5454146a0b0f4b970269e84c1166d0844c164df6ef43a48d8a96c14106936e159e0943f98b94aa601eb18600c0a59440000)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x130060a40040260960ce06303d815c07601709206638806e31402992100e602180b624454208971c4804e30b10e1c4038806100aa11e03682c127000e18612344000,0x130060a40040260960ce06303d815c07601709206638806e31402992100e602180b624454208971c4804e30b10e1c4038806100aa10024805900f210d840c002de2caa44d05381003baa003650200077624306009e1068a040a2093470509f1a4aa08e8601d25539b17d1c152e890f94807b040986150c087b2680190400108a74393b3a04002338000d2e402b243268242e3e150f0916bc8c1d26a1892479a440118a160c161c09090d26ae8c0035bd00440f40c0051c00250439aa1595259a3f54003d1695260402aa838001963b7b1218e2e99864444911e680328028a6c00cb3fc81d612ca11cb968e2c3753c9c886558f0f89d2c04d8c481a391e06813a4cd0f63c09010182f100)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x3884b06602e0040c2086027009819c0846a0,0x3a80b09e0040c608607601708124201b03d8c026102da4039809601992b004ed80ce131886fa431450602ba210d4c220c24a861a00ee30c1d0100dc02984181001188f851e42261c6bce93401d04190d0844d1165c1a1d28681428cc396643caab4228e2fdf3cd1aee050cd289d64d10c20013538156df18868684c21389031020024015401c4014452001d0a312810b9bcc0235000adb491b565700104f06000bdd3e8ac116470534851b0fa01854b0b0d494a5c1220e529216c6178e1ab3d961494d0349908992989084091cc099554e1d53dbc41531da5927d0bc09360d1a061a823f200545000e47e0079080fc32c80032840467940564004a91080001400327966842f200426c440507f484419a107846351a0847fc20408018ad34120800888200425908721fe790854380c8305448108880438164fd100000)'
  });
  try {
    await completium.call('ideabox', {
      entry : 'vote',
      with  : '(0,1)',
      as    : 'alice'
    });
    assert(false, "Non Registered Voter Should Not Be Able To Vote.");
  } catch (e) {
    assert(true);
  }
  await completium.call('ideabox', {
    entry : 'register',
    with  : '@' + completium.getAddress('alice'),
  });
  await completium.call('ideabox', {
    entry : 'vote',
    with  : '(0,5)',
    as    : 'alice'
  });
  try {
    await completium.call('ideabox', {
      entry : 'vote',
      with  : '(0,5)',
      as    : 'alice'
    });
    assert(false, "Voter Should Not Be Able To Vote More Than 5 Times.");
  } catch (e) {
    assert(true);
  }
  await completium.call('ideabox', {
    entry : 'register',
    with  : '@' + completium.getAddress('bob'),
  });
  await completium.call('ideabox', {
    entry : 'vote',
    with  : '(0,1)',
    as    : 'bob'
  });
  await completium.call('ideabox', {
    entry : 'vote',
    with  : '(1,4)',
    as    : 'bob'
  });
  await completium.call('ideabox', { entry : 'terminate' });
  // Check nb votes and that only idea 0 is selected
  const storage = await completium.getStorage('ideabox');
  const nbvotes_0 = storage.idea.get('0').nbvotes.toNumber();
  const nbvotes_1 = storage.idea.get('1').nbvotes.toNumber();
  assert(nbvotes_0 == 6, "Invalid Number Of Votes Idea 0");
  assert(nbvotes_1 == 4, "Invalid Number Of Votes Idea 1");
  assert(storage.selected.length == 1 && storage.selected[0].toNumber() == 0);
}

test();
