import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import { publicIp, publicIpv4, publicIpv6} from 'npm:public-ip@6';

const router = new Router();
router.get("/public-ip", async (ctx) => {
  const [Ip, Ipv6, Ipv4] = await Promise.all([
    publicIp(),
    publicIpv6(),
    publicIpv4()
  ])
  ctx.response.body = { Ip, Ipv4, Ipv6 };
  ctx.response.type = "json";
  ctx.response.status = Status.OK;
});

const app = new Application();
app.addEventListener('listen', (e) => {
  console.log('server running at :', e.port)
})
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: Deno.env.get('PORT') || 8080 });