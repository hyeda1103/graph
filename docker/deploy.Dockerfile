FROM node:16-bullseye-slim AS build

WORKDIR /app
ENV NODE_ENV production

RUN apt update && apt install -y --no-install-recommends dumb-init

COPY . .

#RUN yarn plugin import workspace-tools
#RUN yarn workspaces focus --production

RUN yarn
RUN yarn add --dev copy-webpack-plugin

RUN yarn build

FROM node:16-bullseye-slim

WORKDIR /app
ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs

#USER nextjs

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build /app/scripts/entrypoint.sh ./

RUN chmod +x ./entrypoint.sh

COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
