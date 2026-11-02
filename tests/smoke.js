// Ortho Card smoke tests. Serve the site root with this repo at /ortho-card/.
const {page,expect,test,noErrors,run}=require('./harness');
run({name:'Ortho Card',fn:async()=>{
  await test('loads and exports a card with no patient fields',async()=>{const pg=await page('/ortho-card/');
    const svg=await pg.evaluate(()=>JSON.stringify(exportSVG()));expect(/DATE/.test(svg)&&/CLINICIAN/.test(svg),'card header missing');expect(!/PATIENT|HOSPITAL/.test(svg),'patient fields on card');await noErrors(pg)});
  await test('no patient name or CHI boxes',async()=>{const pg=await page('/ortho-card/');expect(!(await pg.locator('#pname,#pnum').count()),'patient boxes present')});
  await test('logo links to the landing page',async()=>{const pg=await page('/ortho-card/');expect((await pg.getAttribute('a.homelink','href'))==='/','logo link missing')});
}});
