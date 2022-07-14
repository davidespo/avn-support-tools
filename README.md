# Solving User Problems using Aiven's Public API

[Deployed Example](https://davidespo.github.io/avn-support-tools/). See more
in the solution and implementation section.

## Disclaimer

This project/site is NOT officially supported by Aiven.

This tooling was created by an Aiven employee to show the power of API's
while solving the real world pain of managing support tickets across
multiple projects.

Use this project at your own risk. Or fork it and make it your own!

## The Power of Public API's

Machine communication has always been important to facilitate collaboration. Data providers, like social media platforms, realized the value of exposing raw data to users. This allowed for faster adoption of their platform as data was embedded
and integrated into new application, or new user experiences were provided. New
experiences can help drive adoption in underserved populations. I am using an
example of that approach here. Take data freely available to Aiven's users and
display it in a different way.

## The Problem: Scaling is Hard

Aiven deploys data services inside projects. Historically that was our largest
scope of context. So you would always go into projects to do anything related to
that project. Sounds simple right? Same with AWS, if I want to modify a service
I need to go to the project, and region... then service type... then find the
instance... wait, it was the other region! Right?! Why am I getting charged
$0.87 for compute?!

Not sure if you have experience a similar problem. At Aiven we expose our support
tooling inside the scope of a project. This is great if you are deploying into
`dev`, `staging`, and `prod` but doesn't scale well when you are deploying
customer specific environments, i.e. `(staging + prod) * number_of_customers ~= a lot...`. Some of our customers have hundreds of projects and thousands of services.
We are working on solutions to this problem build natively into the application
but... why not have some fun with API's. All the data is available, let's use it.

## Planning

As a technical employee, I have access to 46 projects running on the Aiven platform.
So I know that I need to get a list of all of my projects, then pull support
tickets for each of them. At the end of the day, most of the internet is just
build with API calls and `for` loops. Aiven has great technical documentation
so let't look for those two calls:

Docs: [Me: details about current user](https://api.aiven.io/doc/#operation/UserInfo)

```sh
curl --request GET \
  --url https://api.aiven.io/v1/me \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN'
#  {
#    "user": {
#      "projects": [ {...} ]
#    }
#  }
```

That makes it easy since I can grab all of the projects from my current user. From
there, I can just grab tickets for each project.

Docs: [List Support Tickets](https://api.aiven.io/doc/#operation/ProjectTicketList)

```sh
curl --request GET \
  --url https://api.aiven.io/v1/project/%7Bproject%7D/tickets \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN'
#   {
#     "tickets": [
#         {
#         "create_time": "string",
#         "title": "string",
#         "severity": "critical",
#         "state": "closed",
#         ...
#         }
#     ]
#     }
```

## Solution

I will also need an [Aiven API Key (help.aiven.io)](https://help.aiven.io/en/articles/2059201-authentication-tokens).

The psuedo code is pretty simple. If you were to build a bare minimum Python, Bash,
or NodeJS cli it would look pretty similar.

```js
const user = fetchUser(apiKey); // ignoring async api calls for now
const projects = user.projects;
const tickets = [];
for (const projectName of projects) {
  const projectTickets = fetchTickets(projectName);
  for (const ticket of projectTickets) {
    tickets.push(ticket);
  }
}
console.log(tickets);
```

## Implementation

I took this project a little further and build a client side site hosted on
Github. Here is my stack for the project (and some justifications)

- React
- [Bootstrap](https://getbootstrap.com/) + [Bootswatch](https://bootswatch.com/) + [cdnjs](https://cdnjs.com/) for styling
- Redux + [Rematch](https://rematchjs.org/) for global state management
- [react-data-table-component](https://react-data-table-component.netlify.app) for easy data display
- [GitHub Pages](https://pages.github.com/) + [gh-pages](https://github.com/tschaub/gh-pages) to deploy and host public static site

This is a screen shot of the final product. I am able to see all of my support tickets in a single view that is sortable and filterable.

![Demo Screen Shot](assets/demo.png)

## Conclusion

Why are API's so awesome! This was a quick project to try out something new. Since
I already had access to the data through a public API, I was able to crank
something out in my own private Hackathon on a random Wednesday night... and
Thursday morning ;)

But it goes so much further than new user experiences. Aiven is focused on
API first which enable us to integrate with A LOT of other tooling and systems.
For example we have first class implementations of CLI tooling, Terraform provider,
and Kubernetes operators!

![Api First](assets/apiFirst.png)

## About Aiven/Me

I (David Esposito) am a "recovering" over-engineering-er. Then again, I build
and deployed this project in ~8 hours. In a previous lifetime, I was an
Enterprise Platform Architect working on systems integration for IT
automation. If you want opinions about API's, I used 40+ 3rd party API in
production (and all the breaking changes along the way...). Reach out to me
if you want to talk about the future of API, GraphQL, WebSockets or anything else that involves big numbers and graphs that go-up-and-to-the-right.

Aiven is a data platform that focuses on running open source databases, streaming technologies, and observability tools in the cloud. I lead the customer engagement
team focused on how we can partner with our customers (and partners) to add more
value for mutual success. It's been a crazy ride but extremely rewarding as I am
able to enable and empower my teams, customers, and partners.
