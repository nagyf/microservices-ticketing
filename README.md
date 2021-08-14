## Fixing issues with Kubernetes

### Enable Nginx ingress

If ingress service is running but the application cannot be accessed, try enabling ingress-nginx:

```
minikube addons enable ingress
```

### Docker image pull issues

In the same terminal execute the following:

```
eval $(minikube docker-env)
```

Then build the images in the same terminal.