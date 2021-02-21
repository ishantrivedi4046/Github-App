export class RepoData {
  key = "";
  id = "";
  name = "";
  full_name = "";
  isPrivate = undefined;
  description = "";
  isForked = undefined;
  branchesUrl = "";
  tagsUrl = "";
  languagesUrl = "";
  created_at = undefined;
  updated_at = undefined;
  forks_count = 0;
  open_issue_count = 0;
  default_branch = undefined;
  constructor(restdata: any) {
    if (restdata) {
      this.key = restdata.id;
      this.id = restdata.id;
      this.name = restdata.name;
      this.full_name = restdata.full_name;
      this.isPrivate = restdata.private;
      this.description = restdata.description;
      this.isForked = restdata.fork;
      this.branchesUrl = this.trimUrl(restdata.branches_url || "");
      this.tagsUrl = restdata.tags_url;
      this.languagesUrl = restdata.languages_url;
      this.created_at = restdata.created_at;
      this.updated_at = restdata.updated_at;
      this.forks_count = restdata.forks_count;
      this.open_issue_count = restdata.open_issues_count;
      this.default_branch = restdata.default_branch;
    }
  }
  trimUrl(url: any) {
    return url.substring(0, url.indexOf("{"));
  }
}
