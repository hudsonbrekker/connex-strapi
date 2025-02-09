# Use node 20 as base
FROM node:20

# Set environment variable (default to development)
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /opt/app

# Copy package.json and lock file first (to cache dependencies)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Ensure correct file permissions
RUN chown -R node:node /opt/app

# Switch to the node user
USER node

# Build Strapi
RUN yarn build

# Set the correct path for node modules
ENV PATH="/opt/app/node_modules/.bin:$PATH"

# Expose Strapi port
EXPOSE 1337

# Start Strapi in development mode
CMD ["yarn", "develop"]